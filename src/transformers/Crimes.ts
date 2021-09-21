export function transformCrimesData(data: any) {
  return data
    .filter((crime: any) => crime && crime.location)
    .map(({ location }: any) => ({
      latitude: +location.latitude,
      longitude: +location.longitude,
    }));
}
