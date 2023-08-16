import { Button, FileInput, Label, Modal, TextInput } from 'flowbite-react';
import React, { useRef, useState } from 'react';
import DatePicker from '../ui/DatePicker';
import { CreateSaleType } from '../../api/sale_api';

const formInitValues: CreateSaleType = {
  name: '',
  status: 'new',
  start_date: new Date().toISOString(),
  end_date: new Date().toISOString(),
  file: null,
};
interface ISaleModal {
  onClose: () => void;
  onSuccess: (form: CreateSaleType) => void;
  isOpen: boolean;
}
function NewSaleModal({ onClose, isOpen, onSuccess }: ISaleModal) {
  const [modalForm, setModalForm] = useState<CreateSaleType>(formInitValues);
  const rootRef = useRef<HTMLDivElement>(null);
  const handleChange = (field: keyof CreateSaleType, value: any) => {
    setModalForm((state) => ({ ...state, [field]: value }));
  };

  return (
    <div ref={rootRef}>
      <Modal
        show={isOpen}
        onClose={onClose}
        root={rootRef.current ?? undefined}>
        <Modal.Header>Добавление акции</Modal.Header>
        <Modal.Body>
          <form className="flex max-w-md flex-col gap-4">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Имя акции" />
              </div>
              <TextInput
                id="name"
                placeholder="Имя"
                required
                type="email"
                value={modalForm.name}
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </div>

            {/* Range picker for sale date */}
            <div className="flex flex-row gap-5">
              <div>
                <div className="mb-2 block">
                  <Label value="Начало акции" />
                </div>

                <DatePicker
                  onChange={(date) => handleChange('start_date', date.toISOString())}
                  title="Начало акции"
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label value="Конец акции" />
                </div>

                <DatePicker
                  onChange={(date) => handleChange('end_date', date.toISOString())}
                  title="Конец акции"
                />
              </div>
            </div>

            <div className="max-w-md" id="fileUpload">
              <div className="mb-2 block">
                <Label htmlFor="file" value="Загрузите файл акции" />
              </div>
              <FileInput
                onChange={(e) =>
                  handleChange(
                    'file',
                    e.target.files ? e.target.files[0] : null,
                  )
                }
                helperText={
                  <>
                    Файл находится в кабинете WB:{' '}
                    <a href="https://seller.wildberries.ru/promo-calendar">
                      https://seller.wildberries.ru/promo-calendar
                    </a>
                  </>
                }
                id="file"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="flex justify-end">
          <Button onClick={onClose} color="gray">
            Отмена
          </Button>
          <Button
            className="bg-primary-600"
            onClick={() => onSuccess(modalForm)}>
            Добавить акцию
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default NewSaleModal;
