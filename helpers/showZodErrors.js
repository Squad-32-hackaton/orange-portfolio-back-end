export default function showZodErrors(error) {
    return error.issues.map((issue) => issue.message);
}
