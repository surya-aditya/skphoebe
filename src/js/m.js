import Grid from "./Grid";
new Grid([4, false]);

import Engine from "./_m/Engine";
import Intro from "./_m/Intro";
import Mutation from "./_m/Mutation";
import Controller from "./Global/Controller";

new Controller([false, Engine, Mutation, Intro]);
