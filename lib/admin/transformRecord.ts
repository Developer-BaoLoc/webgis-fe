export function transformRecordForForm(
  record: Record<string, unknown>,
) {
  const next = { ...record };
  const geom =
    typeof record.geom === 'string'
      ? parseGeometry(record.geom)
      : (record.geom as
          | GeoJSON.Point
          | GeoJSON.Polygon
          | undefined);

  if (geom?.type === 'Point') {
    next.longitude =
      record.longitude ?? geom.coordinates[0];
    next.latitude =
      record.latitude ?? geom.coordinates[1];
  }

  if (geom?.type === 'Polygon') {
    next.geomGeoJson = geom;
  }

  return next;
}

function parseGeometry(value: string) {
  try {
    return JSON.parse(value) as
      | GeoJSON.Point
      | GeoJSON.Polygon;
  } catch {
    return undefined;
  }
}
