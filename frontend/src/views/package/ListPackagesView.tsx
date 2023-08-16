import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import PackagesTable from '../../components/package/PackagesTable';

function ListPackagesView() {
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
        <PackagesTable packages={[]} />
      </div>
    </div>
  );
}

export default ListPackagesView;
