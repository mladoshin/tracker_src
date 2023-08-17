import React from 'react';
import { PackageType } from './PackagesTable';
import { Button, Table, TextInput } from 'flowbite-react';
import { MdDelete } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
interface IRouteFormProps {
  values: PackageType['route']['steps'];
  handleChange?: any;
  handleBlur?: any;
}
function RouteForm({ values, handleChange, handleBlur }: IRouteFormProps) {
  function handleDeleteRow(idx: number) {
    const tmp = [...values];
    tmp.splice(idx, 1);
    handleChange('route.steps', [...tmp]);
  }

  function handleAddRow() {
    const tmp = [...values];
    tmp.push({
      address: '',
      name: '',
      timeout: 0,
    });
    handleChange('route.steps', [...tmp]);
  }

  return (
    <Table>
      <Table.Head>
        <Table.HeadCell></Table.HeadCell>
        <Table.HeadCell>Статус</Table.HeadCell>
        <Table.HeadCell>Адрес</Table.HeadCell>
        <Table.HeadCell>Интервал (Часы : Минуты)</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {values.map((step, idx) => (
          <Table.Row
            className="bg-white dark:border-gray-700 dark:bg-gray-800"
            key={(step as any).id || idx}>
            <Table.Cell className="whitespace-nowrap font-mediu">
              <Button
                className="text-red-600 bg-transparent hover:bg-gray-200"
                onClick={() => handleDeleteRow(idx)}>
                <MdDelete className="w-5 h-5 text-red-600" />
              </Button>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
              <TextInput
                value={step.name}
                onChange={(e) =>
                  handleChange(`route.steps[${idx}].name`, e.target.value)
                }
              />
            </Table.Cell>
            <Table.Cell>
              <TextInput
                value={step.address}
                onChange={(e) =>
                  handleChange(`route.steps[${idx}].address`, e.target.value)
                }
              />
            </Table.Cell>
            <Table.Cell className="flex gap-3 items-center">
              <TextInput
                className="w-20"
                type="number"
                value={Math.floor(step.timeout / 60)}
                onChange={(e) => {
                  const minutes = +e.target.value * 60 + (step.timeout % 60);
                  handleChange(`route.steps[${idx}].timeout`, +minutes);
                }}
              />
              <span className="text-xl">:</span>
              <TextInput
                className="w-20"
                type="number"
                value={step.timeout % 60}
                onChange={(e) => {
                  const minutes =
                    Math.floor(step.timeout / 60) * 60 + +e.target.value;
                  console.log(minutes);
                  handleChange(`route.steps[${idx}].timeout`, +minutes);
                }}
              />
            </Table.Cell>
          </Table.Row>
        ))}
        <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
          <Table.Cell colSpan={4} className="">
            <Button onClick={handleAddRow} className="mx-auto">
              <IoMdAddCircleOutline className="h-5 w-5 mr-2" />
              <span>Добавить шаг</span>
            </Button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

export default RouteForm;
