import styles from './styles.less'; // This line cost me 2-3 hours of debugging. Without this the styles.css is not emitted by etract text web pack plugin
import greeting from "./content";

document.write(greeting);