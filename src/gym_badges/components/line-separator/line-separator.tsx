import styles from "@/components/line-separator/line-saparator.module.scss";

export default function LineSeparator({
  vertical = false,
  hidden,
}: {
  vertical?: boolean;
  hidden?: boolean;
}) {
  return <div className={vertical ? styles.vertical : styles.horizontal} hidden={hidden}/>;
}
