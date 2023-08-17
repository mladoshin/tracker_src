import { Button, Label, Modal, TextInput } from 'flowbite-react';
import React, { useMemo, useRef, useState } from 'react';
import { useGetAllRoutesQuery } from '../../api/api_index';
import { BsSearch } from 'react-icons/bs';
import RoutesTable from './RoutesTable';

interface IRoutePresetSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (id: string) => void;
}
function RoutePresetSelectModal({
  isOpen,
  onClose,
  onSuccess,
}: IRoutePresetSelectModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [search, setSearch] = useState('');
  const { data } = useGetAllRoutesQuery();
  const [routeId, setRouteId] = useState('');

  const filtered_routes = useMemo(() => {
    if (!data) return [];
    if (!search) return [...data];
    return data.filter((route) => {
      return route.name.toLowerCase().includes(search.toLowerCase());
    });
  }, [search, data]);

  return (
    <div ref={rootRef}>
      <Modal
        show={isOpen}
        onClose={onClose}
        root={rootRef.current ?? undefined}>
        <Modal.Header>Загрузка пресета маршрута</Modal.Header>
        <Modal.Body>
          <div>
            <TextInput
              icon={BsSearch}
              id="search"
              placeholder="Поиск"
              required
              type="text"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <RoutesTable
            routes={filtered_routes}
            onSelect={(id) => setRouteId(id)}
            selectedId={routeId}
          />
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={onClose} color="gray">
            Отмена
          </Button>
          <Button className="bg-primary-600" onClick={() => onSuccess(routeId)}>
            Загрузить маршрут
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default RoutePresetSelectModal;
