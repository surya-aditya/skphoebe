// import Grid from "./Grid"
// new Grid({ _cta: false, _col: 15 })

import Engine from "./_d/Engine";
import Intro from "./_d/Intro";
import Mutation from "./_d/Mutation";
import Controller from "./Global/Controller";

new Controller([true, Engine, Mutation, Intro]);
