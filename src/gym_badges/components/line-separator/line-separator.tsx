import styles from "@/components/line-separator/line-saparator.module.scss"

export default function LineSeparator({ vertical=false, text }: { vertical?: boolean, text?: string }) {
    return (
        <div className={vertical ? styles.vertical : styles.horizontal}></div>
    )
}