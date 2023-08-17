import { Button, Table } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GetPackageDto } from '../../../../backend/src/package/dto/get-package.dto';
import { useDeleteRouteMutation } from '../../api/api_index';
import { MdDelete } from 'react-icons/md';
import { GetRouteDto } from '../../../../backend/src/route/dto/get-route.dto';

export type PackageType = GetPackageDto;

interface ISalesTableProps {
  routes: GetRouteDto[];
  onSelect?: (id: string) => void;
  selectedId?: string;
}

function RoutesTable({ routes, onSelect, selectedId }: ISalesTableProps) {
  console.log(selectedId);
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
                {routes?.map((r, idx) => (
                  <RouteRow
                    route={r}
                    key={r.id}
                    onSelect={onSelect}
                    active={selectedId === r.id}
                  />
                ))}
              </>
            );
          }

          return <span>Список маршрутов пуст</span>;
        })()}
      </Table.Body>
    </Table>
  );
}

function RouteRow({
  route,
  onSelect,
  active,
}: {
  route: GetRouteDto;
  onSelect?: (id: string) => void;
  active: boolean;
}) {
  const [deleteRoute] = useDeleteRouteMutation();
  return (
    <Table.Row
      className={`border-gray-200 ${
        active ? 'bg-blue-400 hover:bg-blue-400' : 'bg-white hover:bg-gray-200'
      }`}
      onClick={() => {
        if (onSelect) onSelect(route.id);
      }}>
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {route.name}
      </Table.Cell>
      <Table.Cell>{route.from}</Table.Cell>
      <Table.Cell>{route.to}</Table.Cell>
      <Table.Cell>
        <div className={`flex items-center gap-4 ${onSelect ? 'hidden' : ''}`}>
          <Link
            to={`/panel/routes/${route.id}`}
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            <p>Открыть</p>
          </Link>
          <Button
            className="text-red-600 bg-transparent hover:bg-gray-200"
            onClick={() => deleteRoute(route.id)}>
            <MdDelete className="w-5 h-5 text-red-600" />
          </Button>
        </div>
      </Table.Cell>
    </Table.Row>
  );
}

export default RoutesTable;
