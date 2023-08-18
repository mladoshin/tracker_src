import { GetPackageDto } from '../dto/get-package.dto';

export function getPackageStatus(pack: GetPackageDto): string {
  const now = new Date();
  const diff: number =
    Math.abs(now.getTime() - new Date(pack.createdAt).getTime()) / 60000;

  let status = '';
  pack.route.steps?.forEach((s) => {
    if (diff >= s.timeout) {
      status = s.name;
    }
  });

  return status;
}
