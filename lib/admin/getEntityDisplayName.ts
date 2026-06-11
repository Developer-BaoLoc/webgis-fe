export function getEntityDisplayName(
    row: any,
) {
    if (!row) return 'Đối tượng';

    if (Array.isArray(row)) {
        row = row[0];
    }

    return (
        row?.name ||
        row?.product_name ||
        row?.area_name ||
        row?.title ||
        `#${row?.id ?? ''}`
    );
}