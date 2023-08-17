import { Button, Table } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GetPackageDto } from '../../../../backend/src/package/dto/get-package.dto';
import {
  FetchAllPackage,
  FetchAllPackagesResponse,
  useDeletePackageMutation,
} from '../../api/api_index';
import { MdDelete } from 'react-icons/md';

export type PackageType = GetPackageDto;

interface ISalesTableProps {
  routes: FetchAllPackagesResponse;
}

function RoutesTable({ routes }: ISalesTableProps) {
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Имя</Table.HeadCell>
        <Table.HeadCell>От</Table.HeadCell>
        <Table.HeadCell>До</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {(() => {
          if (routes?.length > 0) {
            return (
              <>
                {routes?.map((r) => (
                  <RouteRow route={r} key={r.id} />
                ))}
              </>
            );
          }

          return <span>Список акций пуст</span>;
        })()}
      </Table.Body>
    </Table>
  );
}

function RouteRow({ route }: { route: FetchAllPackage }) {
  const [deletePackage] = useDeletePackageMutation();
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {route.name}
      </Table.Cell>
      <Table.Cell>{route.tracking_number}</Table.Cell>
      <Table.Cell>{route.status}</Table.Cell>
      <Table.Cell>
        <div className="flex items-center gap-4">
          <Link
            to={`/panel/packages/${route.tracking_number}`}
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            <p>Открыть</p>
          </Link>
          <Button
            className="text-red-600 bg-transparent hover:bg-gray-200"
            onClick={() => deletePackage(route.tracking_number)}>
            <MdDelete className="w-5 h-5 text-red-600" />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default RoutesTable;
