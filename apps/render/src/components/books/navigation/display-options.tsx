import { useRouter, useSearchParams, usePathname } from "next/navigation";

import { IconType } from "src/library/icon";
import IconButton from "src/library/button/icon";

import styles from "./display-options.module.scss";

function DisplayOptions() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onChange = (newDisplay?: string) => {
    const url = new URL("http://to");
    url.pathname = pathname;
    const sp = new URLSearchParams(searchParams.toString());
    if (newDisplay) {
      sp.set("d", newDisplay);
    } else {
      sp.delete("d");
    }
    url.search = sp.toString();

    router.push(url.href.replace(url.origin, ""));
  };

  return (
    <div className={styles.root}>
      <IconButton icon={IconType.Grid} onClick={() => onChange(undefined)} />
      <IconButton icon={IconType.List} onClick={() => onChange("table")} />
    </div>
  );
}

export default DisplayOptions;
