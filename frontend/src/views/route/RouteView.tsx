import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  CreatePackageBody,
  FetchPackageResponse,
  useCreatePackageMutation,
  useCreateRouteMutation,
  useLazyFetchPackageQuery,
  useLazyGetRouteQuery,
  useUpdatePackageMutation,
  useUpdateRouteMutation,
} from '../../api/api_index';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { Button, Label, TextInput } from 'flowbite-react';
import RouteForm from '../../components/package/RouteForm';
import { GetPackageDto } from '../../../../backend/src/package/dto/get-package.dto';
import { PackageType } from '../../components/package/PackagesTable';
import moment from 'moment';
import { GetRouteDto } from '../../../../backend/src/route/dto/get-route.dto';
import { CreateRouteDto } from '../../../../backend/src/route/dto/create-route.dto';

type RouteForm = { route: CreateRouteDto };

const initValues: RouteForm = {
  route: {
    name: '',
    steps: [],
  },
};

function RouteView() {
  const { routeId } = useParams();
  const [getRoute, { data: route }] = useLazyGetRouteQuery();
  const [updateRoute, { isLoading }] = useUpdateRouteMutation();
  const [createRoute, { isLoading: isCreateLoading }] =
    useCreateRouteMutation();

  const navigate = useNavigate();

  const formikRef = useRef(null);
  useEffect(() => {
    if (routeId && routeId !== 'new') {
      fetch(routeId);
    }
  }, [routeId]);

  async function fetch(routeId: string) {
    try {
      const res = await getRoute(routeId).unwrap();
      console.log(res);
      await (formikRef.current as any).setValues({ route: res }, false);
    } catch {}
  }

  async function handleCancel() {
    if (routeId === 'new') {
      await (formikRef.current as any).setValues(initValues, false);
    } else {
      await fetch(routeId as string);
    }
  }

  async function onSubmit(values: RouteForm) {
    try {
      if (routeId === 'new') {
        //create new package
        await createRoute(values.route).unwrap();
        navigate('/panel/routes');
      } else {
        await updateRoute({ id: routeId as string, data: values.route }).unwrap();
        navigate('/panel/routes');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="flex flex-row justify-between">
        <h2 className="font-bold text-3xl">Маршрут {route?.name}</h2>
      </div>
      <Formik
        innerRef={formikRef}
        initialValues={initValues}
        onSubmit={(values: RouteForm) => onSubmit(values)}>
        {(props) => (
          <form onSubmit={props.handleSubmit}>
            <div className="w-96 mb-7">
              <div className="mb-2 block">
                <Label htmlFor="name" value="Название маршрута" />
              </div>
              <TextInput
                id="name"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.route.name}
                name="route.name"
              />
            </div>

            <RouteForm
              values={props.values.route.steps}
              handleChange={props.setFieldValue}
              handleBlur={() => {}}
            />

            <div className="flex justify-end mt-8 gap-6">
              <Button
                size="lg"
                color="light"
                onClick={() => navigate('/panel/routes')}
                className="mr-auto">
                Назад
              </Button>
              <Button size="lg" color="light" onClick={handleCancel}>
                Отменить
              </Button>
              <Button
                type="submit"
                size="lg"
                className="px-20"
                isProcessing={isLoading}>
                {routeId === 'new' ? 'Создать' : 'Сохранить'}
              </Button>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default RouteView;
