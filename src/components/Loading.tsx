import { HugeiconsIcon } from "@hugeicons/react";
import { Loading02Icon } from "@hugeicons/core-free-icons";
function Loading() {
  return (
    <div>
      <HugeiconsIcon
        icon={Loading02Icon}
        size="40px"
        className="animate-spin"
      />
    </div>
  );
}
export default Loading;
