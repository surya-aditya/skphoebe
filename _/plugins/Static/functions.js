import path from "path";
import { readdir, mkdir, copyFile } from "fs/promises";

class Semaphore {
	constructor(max) {
		this.tasks = [];
		this.counter = 0;
		this.max = max;
	}

	async acquire() {
		if (this.counter < this.max) {
			this.counter++;
		} else {
			await new Promise((resolve) => this.tasks.push(resolve));
			this.counter++;
		}
	}

	release() {
		this.counter--;
		if (this.tasks.length > 0) {
			const resolve = this.tasks.shift();
			resolve();
		}
	}
}

export async function copyDirectory(src, dest, semaphore = new Semaphore(10)) {
	try {
		await mkdir(dest, { recursive: true });
	} catch (e) {
		if (e.code !== "EEXIST") {
			throw e;
		}
	}

	let entries;
	try {
		entries = await readdir(src, { withFileTypes: true });
	} catch (error) {
		console.error(`Error reading directory ${src}: ${error}`);
		return;
	}

	// Process all entries concurrently, within the semaphore limit
	await Promise.all(
		entries.map(async (entry) => {
			const srcPath = path.join(src, entry.name);
			const destPath = path.join(dest, entry.name);

			if (entry.isDirectory()) {
				// Recursively copy directory
				await copyDirectory(srcPath, destPath, semaphore);
			} else {
				// Copy file
				await semaphore.acquire();
				try {
					await copyFile(srcPath, destPath);
				} catch (error) {
					console.error(
						`Error copying file ${srcPath} to ${destPath}: ${error}`
					);
				} finally {
					semaphore.release();
				}
			}
		})
	);
}
