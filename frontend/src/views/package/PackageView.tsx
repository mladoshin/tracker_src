import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CreatePackageBody,
  FetchPackageResponse,
  useCreatePackageMutation,
  useLazyFetchPackageQuery,
  useUpdatePackageMutation,
} from '../../api/api_index';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Button, Label, TextInput } from 'flowbite-react';
import RouteForm from '../../components/package/RouteForm';
import { GetPackageDto } from '../../../../backend/src/package/dto/get-package.dto';
import { PackageType } from '../../components/package/PackagesTable';
import moment from 'moment';

const initValues = {
  carrier: '',
  comment: '',
  destination: '',
  expected_delivery_date: new Date(),
  mode: '',
  name: '',
  payment_mode: '',
  receiver_address: '',
  receiver_email: '',
  receiver_name: '',
  receiver_phone: '',
  route: {
    id: '',
    steps: [],
  },
  shipment: '',
  start_address: '',
  start_date: new Date(),
  status: '',
  tracking_number: '',
  weight: 10,
};

function PackageView() {
  const { packageId } = useParams();
  const [getPackage, { data }] = useLazyFetchPackageQuery();
  const [updatePackage, { isLoading }] = useUpdatePackageMutation();
  const [createPackage, { isLoading: isCreateLoading }] =
    useCreatePackageMutation();
  const navigate = useNavigate();

  const formikRef = useRef(null);
  useEffect(() => {
    if (packageId && packageId !== 'new') {
      fetch(packageId);
    }
  }, [packageId]);

  async function fetch(packageId: string) {
    try {
      const res = await getPackage(packageId).unwrap();
      await (formikRef.current as any).setValues(res, false);
    } catch {}
  }

  async function handleCancel() {
    if (packageId === 'new') {
      await (formikRef.current as any).setValues(initValues, false);
    } else {
      await fetch(packageId as string);
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-3xl">
          Посылка {data?.name} {data?.tracking_number}
        </h2>
      </div>
      <Formik
        innerRef={formikRef}
        initialValues={initValues}
        onSubmit={(
          values: PackageType,
          { setSubmitting }: FormikHelpers<PackageType>,
        ) => {
          const body: CreatePackageBody = {
            ...values,
            start_date: new Date(values.start_date).toISOString(),
            expected_delivery_date: new Date(
              values.expected_delivery_date,
            ).toISOString(),
          };

          if (packageId === 'new') {
            //create new package

            createPackage(body)
            navigate('/panel/packages')
          } else {
            updatePackage({ id: packageId as string, data: body });
          }
        }}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="w-96 mx-auto">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Название посылки" />
              </div>
              <TextInput
                id="name"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.name}
                name="name"
              />
              <div className="mb-2 block">
                <Label htmlFor="carrier" value="Перевозчик" />
              </div>
              <TextInput
                id="carrier"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.carrier}
                name="carrier"
              />

              <div className="mb-2 block">
                <Label htmlFor="comment" value="Комментарий" />
              </div>
              <TextInput
                id="comment"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.comment}
                name="comment"
              />

              <div className="mb-2 block">
                <Label htmlFor="mode" value="Режим" />
              </div>
              <TextInput
                id="mode"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.mode}
                name="mode"
              />

              <div className="mb-2 block">
                <Label htmlFor="weight" value="Вес" />
              </div>
              <TextInput
                id="weight"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.weight}
                name="weight"
              />
              <div className="mb-2 block">
                <Label htmlFor="shipment" value="Доставка" />
              </div>
              <TextInput
                id="shipment"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.shipment}
                name="shipment"
              />

              <div className="mb-2 block">
                <Label htmlFor="start_date" value="Дата принятия" />
              </div>
              <TextInput
                id="start_date"
                type="date"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={moment(new Date(props.values.start_date)).format(
                  'YYYY-MM-DD',
                )}
                name="start_date"
              />

              <div className="mb-2 block">
                <Label htmlFor="start_address" value="Город отправления" />
              </div>
              <TextInput
                id="start_address"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.start_address}
                name="start_address"
              />

              <div className="mb-2 block">
                <Label htmlFor="destination" value="Город получателя" />
              </div>
              <TextInput
                id="destination"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.destination}
                name="destination"
              />

              <div className="mb-2 block">
                <Label
                  htmlFor="expected_delivery_date"
                  value="Примерное время доставки"
                />
              </div>
              <TextInput
                id="expected_delivery_date"
                type="date"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={moment(
                  new Date(props.values.expected_delivery_date),
                ).format('YYYY-MM-DD')}
                name="expected_delivery_date"
              />

              <div className="mb-2 block">
                <Label htmlFor="payment_mode" value="Способ оплаты" />
              </div>
              <TextInput
                id="payment_mode"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.payment_mode}
                name="payment_mode"
              />

              <div className="mb-2 block">
                <Label htmlFor="receiver_address" value="Адрес получателя" />
              </div>
              <TextInput
                id="receiver_address"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.receiver_address}
                name="receiver_address"
              />

              <div className="mb-2 block">
                <Label htmlFor="receiver_name" value="Имя получателя" />
              </div>
              <TextInput
                id="receiver_name"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.receiver_name}
                name="receiver_name"
              />

              <div className="mb-2 block">
                <Label htmlFor="receiver_email" value="Почта получателя" />
              </div>
              <TextInput
                id="receiver_email"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.receiver_email}
                name="receiver_email"
              />

              <div className="mb-2 block">
                <Label htmlFor="receiver_phone" value="Телефон получателя" />
              </div>
              <TextInput
                id="receiver_phone"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.receiver_phone}
                name="receiver_phone"
              />
            </div>

            <div className="mb-2 block">
              <Label htmlFor="route" value="Маршрут" />
            </div>

            <RouteForm
              values={props.values.route.steps}
              handleChange={props.setFieldValue}
              handleBlur={() => {}}
            />

            <div className="flex justify-end mt-8 gap-6">
              <Button size="lg" color="light" onClick={handleCancel}>
                Отменить
              </Button>
              <Button
                type="submit"
                size="lg"
                className="px-20"
                isProcessing={isLoading}>
                {packageId === 'new' ? 'Создать' : 'Сохранить'}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default PackageView;
