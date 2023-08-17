import { Button, TextInput } from 'flowbite-react';
import React from 'react';
import { BsSearch } from 'react-icons/bs';
import RoutesTable from '../../components/route/RoutesTable';

function ListRoutesView() {
  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-3xl">Маршруты</h2>
      </div>

      <div className="flex flex-row gap-4 my-7">
        <TextInput
          icon={BsSearch}
          id="search"
          placeholder="Имя маршрута"
          required
          type="text"
        />

        <Button color="gray">Поиск</Button>
      </div>

      <div>
        <RoutesTable routes={[]} />
      </div>

      <div className="mt-7">
        <Button onClick={()=>{}}>Добавить маршрут</Button>
      </div>
    </div>
  );
}

export default ListRoutesView;
