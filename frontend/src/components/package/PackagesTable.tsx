import { Table } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { GetPackageDto } from '../../../../backend/src/package/dto/get-package.dto';

export type PackageType = GetPackageDto;

interface ISalesTableProps {
  packages: PackageType[];
}

function PackagesTable({ packages }: ISalesTableProps) {
  return (
    <Table hoverable>
      <Table.Head>
        <Table.HeadCell>Имя посылки</Table.HeadCell>
        <Table.HeadCell>Трек номер</Table.HeadCell>
        <Table.HeadCell>Статус</Table.HeadCell>
        <Table.HeadCell></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {(() => {
          if (packages?.length > 0) {
            return (
              <>
                {packages?.map((p) => (
                  <PackageRow p={p} key={p.tracking_number} />
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

function PackageRow({ p }: { p: PackageType }) {
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
        {p.name}
      </Table.Cell>
      <Table.Cell>
        {p.tracking_number}
      </Table.Cell>
      <Table.Cell>{p.status}</Table.Cell>
      <Table.Cell>
        <Link
          to={`/panel/packages/${p.tracking_number}`}
          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
          <p>Открыть</p>
        </Link>
      </Table.Cell>
    </Table.Row>
  );
}

export default PackagesTable;
