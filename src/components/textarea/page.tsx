import { HTMLProps } from "react";
import styles from "./page.module.css";

export function Textarea(rest: HTMLProps<HTMLTextAreaElement>) {
    return (
        <textarea className={styles.textarea} {...rest}></textarea>
    );
}
