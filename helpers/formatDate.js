import { format } from "date-fns";

export default function formatDate(date, formatStr = "MM/yy") {
    return format(date, formatStr);
}
