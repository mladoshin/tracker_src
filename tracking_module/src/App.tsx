import {
  Alert,
  Card,
  Spinner,
  Table,
  TextInput,
  Timeline,
} from "flowbite-react";
import React, { useEffect, useMemo, useState } from "react";
import { getPackageInfo } from "./api";
import { GetPublicPackageDto } from "../../backend/src/package/dto/get-package.dto";
import { CiDeliveryTruck } from "react-icons/ci";

function App() {
  const [trackNumber, setTrackNumber] = useState("");
  const [pack, setPackage] = useState<GetPublicPackageDto>(
    {} as GetPublicPackageDto
  );
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(fromURL?: boolean) {
    console.log(window.location.pathname);
    const idx = window.location.pathname.indexOf("track/");
    console.log("idx = ", idx);

    const trackNumberFromUrl =
      idx !== -1 ? window.location.pathname.slice(idx + 6).toUpperCase() : null;

    console.log("trackNumberFromUrl = ", trackNumberFromUrl);
    if (!trackNumberFromUrl && fromURL) return;

    if (!fromURL && !trackNumber.length) {
      return setError("Tracking number can't be empty!");
    }

    if (trackNumberFromUrl && fromURL) {
      setTrackNumber(trackNumberFromUrl);
    }

    try {
      setLoading(true);
      setPackage({} as GetPublicPackageDto);
      const res = await getPackageInfo(
        fromURL ? (trackNumberFromUrl as string) : trackNumber.toUpperCase()
      );
      setPackage(res.data);
      setLoading(false);
      setError("");
    } catch (e) {
      setLoading(false);
      setError("Package not found!");
      console.log(e);
    }
  }

  const done_steps = useMemo(() => {
    if (!pack?.route) return [];
    const idx = pack.route.steps.findIndex((st) => st.name === pack.status);

    if (idx === -1) return [];

    return pack.route.steps.slice(0, idx + 1).map((st) => {
      const date_ms =
        new Date(pack.createdAt).getTime() + st.timeout * 60 * 1000;
      const datetime = new Date(date_ms);
      return { ...st, datetime };
    });
  }, [pack]);

  useEffect(() => {
    handleSubmit(true);
  }, []);

  return (
    <div className="sm:px-1 md:px-10">
      <div className="flex gap-3 w-96 mb-7">
        <TextInput
          type="text"
          value={trackNumber}
          onChange={(e) => setTrackNumber(e.target.value.toUpperCase())}
          placeholder="Enter tracking number"
        />
        <button
          onClick={() => handleSubmit(false)}
          className="bg-green-500 hover:bg-green-400 rounded-md text-white px-6"
        >
          Track
        </button>
      </div>
      {(() => {
        if (loading) {
          return (
            <Spinner
              aria-label="Extra large spinner example"
              size="xl"
              color="success"
            />
          );
        }

        if (error) {
          return (
            <Alert color="failure">
              <span>
                <p>{error}</p>
              </span>
            </Alert>
          );
        }

        if (!pack.tracking_id) {
          return null;
        }

        return (
          <Card
            className="my-3"
            theme={{
              root: { children: "flex flex-col gap-2 md:gap-4 p-2 md:p-6" },
            }}
          >
            <h3 className="text-xl">Tracking number: {pack.tracking_id}</h3>
            <RouteTimeline steps={done_steps} />
            <PackageInfo pack={pack} />
          </Card>
        );
      })()}
    </div>
  );
}

function RouteTimeline({
  steps,
}: {
  steps: GetPublicPackageDto["route"]["steps"];
}) {
  return (
    <Timeline
      theme={{
        item: { point: { marker: { icon: { wrapper: "h-10 w-10" } } } },
      }}
    >
      {steps.map((st) => (
        <Timeline.Item>
          <Timeline.Point icon={CiDeliveryTruck} />
          <Timeline.Content>
            <Timeline.Time>
              {new Date((st as any).datetime).toUTCString()}
            </Timeline.Time>
            <Timeline.Title>{st.name}</Timeline.Title>
            <Timeline.Body>
              <p>Address: {st.address}</p>
            </Timeline.Body>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

function PackageInfo({ pack }: { pack: GetPublicPackageDto }) {
  const shipment_info = [
    { title: "Weight", value: pack.weight },
    { title: "Carrier", value: pack.carrier },
    { title: "Mode", value: pack.mode },
    { title: "Product", value: pack.name },
    { title: "Payment mode", value: pack.payment_mode },
    { title: "Departure time", value: new Date(pack.start_date).toUTCString() },
    { title: "Destination", value: pack.destination },
    { title: "Product", value: pack.name },
    {
      title: "Expected delivery date",
      value: new Date(pack.expected_delivery_date).toUTCString(),
    },
    { title: "Comments", value: pack.comment },
    { title: "Type of shipment", value: pack.shipment },
  ];

  const receiver_info = [
    { title: "Name", value: pack.receiver_name },
    { title: "Email", value: pack.receiver_email },
    { title: "Phone", value: pack.receiver_phone },
    { title: "Address", value: pack.receiver_address },
  ];

  return (
    <>
      <h3 className="text-xl my-4">Shipper information</h3>
      <Table className="border-collapse border table-fixed mb-16">
        <Table.Body className="divide-x divide-y ">
          <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
            <Table.Cell className="md:whitespace-nowrap font-medium text-gray-900 dark:text-white border-gray-300 border w-1/2">
              Address
            </Table.Cell>
            <Table.Cell className="border border-gray-300 w-1/2">
              {pack.start_address}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>

      <h3 className="text-xl my-4">Receiver information</h3>
      <Table striped className="border-collapse border table-fixed mb-16">
        <Table.Body className="divide-x divide-y ">
          {receiver_info.map((info) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="md:whitespace-nowrap font-medium text-gray-900 dark:text-white border-gray-300 border w-1/2">
                {info.title}
              </Table.Cell>
              <Table.Cell className="border border-gray-300 w-1/2">
                {info.value}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>

      <h3 className="text-xl my-4">Shipment information</h3>
      <Table striped className="border-collapse border table-fixed">
        <Table.Body className="divide-x divide-y ">
          {shipment_info.map((info) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="md:whitespace-nowrap font-medium text-gray-900 dark:text-white border-gray-300 border w-1/2">
                {info.title}
              </Table.Cell>
              <Table.Cell className="border border-gray-300 w-1/2">
                {info.value}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  );
}

export default App;
