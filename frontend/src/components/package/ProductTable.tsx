import { Table, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { SaleProductDto } from '../../redux/sale/slice';

interface IProductTableProps {
  products: SaleProductDto[];
  handleChangeProduct: (
    idx: number,
    field: keyof SaleProductDto,
    value: any,
  ) => void;
  handleResetProduct: (idx: number) => void;
  handleSaveProduct: (idx: number) => void;
}
function ProductTable({
  products,
  handleChangeProduct,
  handleResetProduct,
  handleSaveProduct,
}: IProductTableProps) {
  return (
    <Table hoverable className="table-auto w-auto">
      <Table.Head>
        <Table.HeadCell style={{ width: 205 }}></Table.HeadCell>
        <Table.HeadCell>Предмет</Table.HeadCell>
        <Table.HeadCell>Остаток</Table.HeadCell>
        <Table.HeadCell>Артикул поставщика</Table.HeadCell>
        <Table.HeadCell>Номенклатура 1С</Table.HeadCell>
        <Table.HeadCell className="whitespace-nowrap">
          Цена текущая
        </Table.HeadCell>
        <Table.HeadCell>Себестоимость</Table.HeadCell>
        <Table.HeadCell>Комиссия</Table.HeadCell>
        <Table.HeadCell>Логистика</Table.HeadCell>
        <Table.HeadCell>Снижение комиссии в акции</Table.HeadCell>
        <Table.HeadCell>Комиссия в акции</Table.HeadCell>
        <Table.HeadCell>Маржинальный доход</Table.HeadCell>
        <Table.HeadCell>Маржинальность</Table.HeadCell>
        <Table.HeadCell> Маржинальность в акции</Table.HeadCell>
        <Table.HeadCell>Плановая цена для акции</Table.HeadCell>
        <Table.HeadCell>Текущая розничная цена</Table.HeadCell>
        <Table.HeadCell>Текущая скидка на сайте, %</Table.HeadCell>
        <Table.HeadCell>Загружаемая скидка для участия в акции</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {(() => {
          if (products?.length > 0) {
            return (
              <>
                {products?.map((p, idx) => (
                  <ProductRow
                    product={p}
                    key={p.id}
                    handleChangeProduct={(field, val) =>
                      handleChangeProduct(idx, field, val)
                    }
                    handleResetProduct={() => handleResetProduct(idx)}
                    handleSaveProduct={() => handleSaveProduct(idx)}
                  />
                ))}
              </>
            );
          }

          return <span>Список продуктов пуст</span>;
        })()}
      </Table.Body>
    </Table>
  );
}

interface IProductTableCellProps {
  className?: string;
  value: any;
  placeholder?: string;
  type?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isEdit: boolean;
}

function ProductTableCell({
  className,
  value,
  placeholder,
  type = 'text',
  onChange,
  isEdit,
}: IProductTableCellProps) {
  return (
    <Table.Cell className={className}>
      {isEdit ? (
        <TextInput
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
        />
      ) : (
        <span>{value}</span>
      )}
    </Table.Cell>
  );
}

interface IProductRowProps {
  product: SaleProductDto;
  handleChangeProduct: (field: keyof SaleProductDto, value: any) => void;
  handleResetProduct: () => void;
  handleSaveProduct: () => void;
}

function ProductRow({
  product: p,
  handleChangeProduct,
  handleResetProduct,
  handleSaveProduct,
}: IProductRowProps) {
  const [edit, setEdit] = useState(false);
  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
      <Table.Cell>
        {edit ? (
          <div className="flex gap-4">
            <span
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
              onClick={() => {
                setEdit(false);
                handleResetProduct();
              }}>
              Отменить
            </span>
            <span
              className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
              onClick={() => {
                setEdit(false);
                handleSaveProduct();
              }}>
              Сохранить
            </span>
          </div>
        ) : (
          <span
            className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 cursor-pointer"
            onClick={() => setEdit(true)}>
            Редактировать
          </span>
        )}
      </Table.Cell>

      <ProductTableCell
        isEdit={edit}
        value={p.title}
        onChange={(e) => handleChangeProduct('title', e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={p.left_wb}
        type="number"
        onChange={(e) => handleChangeProduct('left_wb', +e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={p.supplier_num}
        type="number"
        onChange={(e) => handleChangeProduct('supplier_num', +e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={p.nomenclature}
        type="number"
        onChange={(e) => handleChangeProduct('nomenclature', +e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={p.current_price}
        type="number"
        onChange={(e) => handleChangeProduct('current_price', +e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={p.cost}
        type="number"
        onChange={(e) => handleChangeProduct('cost', +e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={p.commision_rate}
        type="number"
        onChange={(e) => handleChangeProduct('commision_rate', +e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={p.logistics}
        type="number"
        onChange={(e) => handleChangeProduct('logistics', +e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={p.commision_reduction}
        type="number"
        onChange={(e) =>
          handleChangeProduct('commision_reduction', +e.target.value)
        }
      />

      <ProductTableCell
        isEdit={edit}
        value={p.total_commission_rate}
        type="number"
        onChange={(e) =>
          handleChangeProduct('total_commission_rate', +e.target.value)
        }
      />

      <ProductTableCell
        isEdit={edit}
        value={p.margin_profit}
        type="number"
        onChange={(e) => handleChangeProduct('margin_profit', +e.target.value)}
      />
      <ProductTableCell
        isEdit={edit}
        value={(p.margin_rate * 100).toFixed(2)}
        type="number"
        onChange={(e) => handleChangeProduct('margin_rate', +e.target.value)}
      />

      <ProductTableCell
        isEdit={edit}
        value={(p.sale_margin_rate * 100).toFixed(2)}
        type="number"
        onChange={(e) =>
          handleChangeProduct('sale_margin_rate', +e.target.value)
        }
      />
      <ProductTableCell
        isEdit={edit}
        value={p.sale_planned_price}
        type="number"
        onChange={(e) =>
          handleChangeProduct('sale_planned_price', +e.target.value)
        }
      />
      <ProductTableCell
        isEdit={edit}
        value={p.current_retail_price}
        type="number"
        onChange={(e) =>
          handleChangeProduct('current_retail_price', +e.target.value)
        }
      />
      <ProductTableCell
        isEdit={edit}
        value={p.current_sale_percentage}
        type="number"
        onChange={(e) =>
          handleChangeProduct('current_sale_percentage', +e.target.value)
        }
      />
      <ProductTableCell
        isEdit={edit}
        value={p.final_sale_percentage}
        type="number"
        onChange={(e) =>
          handleChangeProduct('final_sale_percentage', +e.target.value)
        }
      />
    </Table.Row>
  );
}

export default ProductTable;
