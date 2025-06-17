import { ContainerProps } from "./types"
import styles from './container.module.css';

export const Container = ({ children }: ContainerProps) => {
    return <div className={styles.container}>{children}</div>
}