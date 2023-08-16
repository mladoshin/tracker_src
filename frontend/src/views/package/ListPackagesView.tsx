import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import PackagesTable from '../../components/package/PackagesTable';
import { FetchAllPackagesResponse, useFetchAllPackagesQuery } from '../../api/api_index';
import { GetPackageDto } from '../../../../backend/src/package/dto/get-package.dto';

function ListPackagesView() {
  const { data: packages, refetch } = useFetchAllPackagesQuery();

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-3xl">Посылки</h2>
        <Button.Group>
          <Button color="gray">Все</Button>
          <Button color="gray">Активные</Button>
          <Button color="gray">Приостановленные</Button>
          <Button color="gray">Архив</Button>
        </Button.Group>
      </div>

      <div className="flex flex-row gap-4 my-7">
        <TextInput
          icon={BsSearch}
          id="search"
          placeholder="Поиск"
          required
          type="text"
        />

        <Button color="gray">Поиск</Button>
      </div>

      <div>
        <PackagesTable packages={packages as FetchAllPackagesResponse} />
      </div>
    </div>
  );
}

export default ListPackagesView;
