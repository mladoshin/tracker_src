import { Navbar } from 'flowbite-react';

export default function TopNavbar() {
  return (
    <Navbar fluid rounded className="shadow-md sticky top-0 z-50">
      <Navbar.Brand href="#">
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Админ панель
        </span>
      </Navbar.Brand>
      {/* <div className="flex md:order-2">
        <Dropdown
          inline
          label={
            <Avatar
              alt="User settings"
              img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
              rounded
            />
          }>
          <Dropdown.Header>
            <span className="block text-sm">Bonnie Green</span>
            <span className="block truncate text-sm font-medium">
              name@flowbite.com
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Аккаунт</Dropdown.Item>
          <Dropdown.Item>Посылки</Dropdown.Item>
          <Dropdown.Item>Маршруты</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item>Выйти</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div> */}
      <Navbar.Collapse>
        
      </Navbar.Collapse>
    </Navbar>
  );
}
