const CYAN = "\x1b[36m";
const GREEN = "\x1b[32m";
const DIM = "\x1b[2m";
const RESET = "\x1b[0m";

const UNDERLINE = "\x1b[4m";
const TAB = "\t";
const SPACE = "  ";

export const C = { CYAN, GREEN, DIM, RESET };
export const D = { UNDERLINE, TAB, SPACE };

export function Divider(color = "CYAN") {
	console.log(`${C[color]}──────────────────────────────────────────${RESET}`);
}

export const START_LOG = () => {
	Divider();
	console.log(`${C.CYAN}📺 Watching for changes...${C.RESET}`);
};

export const WATCHING_LOG = (filename) => {
	Divider();
	console.log(`${C.DIM}📁 File changed: ${D.UNDERLINE}${filename}${C.RESET}`);
};

export const RESOLVING_LOG = () => {
	console.log(`🔍 Resolving CSS ${D.UNDERLINE}${C.RESET}`);
};

export const COPY_STATIC_LOG = () => {
	console.log(`🗳️  Copying static assets${C.RESET}`);
};
