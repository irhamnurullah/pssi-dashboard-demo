import { Card, CardContent } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { MultipleBarChart } from '../../components/charts/barchart/multiple';
import { DataTableExample } from '@/components/table/example-table';

export default function Referee() {
  return (
    <div className="container-pssi mx-4">
      <h2 className="text-primary-pssi text-3xl font-bold">Referees</h2>
      <p className="text-sm text-neutral-400 mt-2">
        An Indonesian referee enforces rules and ensures fairness in sports competitions, certified nationally or internationally.
      </p>

      <div className="mt-4">
        <CarouselSize />
      </div>

      <div className="mt-4">
        <LicenseDistribution />
      </div>

      {/* <div className="mt-4">
        <RefereeList />
      </div> */}
    </div>
  );
}

function CarouselSize() {
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full md:max-w-screen-md lg:max-w-screen-xl mx-auto"
    >
      <CarouselContent>
        {Array.from({ length: 20 }).map((_, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
            <div>
              <Card className="border-none bg-transparent shadow-none">
                <CardContent
                  // className="flex flex-col items-center aspect-square p-6"
                  className="p-0"
                >
                  {/* <span className="text-3xl font-semibold">{index + 1}</span> */}
                  <img className="max-w-sm mx-auto" src="/avatar-referee.png" alt="avatar" />
                  <div className="p-2 rounded-lg bg-white backdrop-filter bg-opacity-10 backdrop-blur-md">
                    <div className="space-y-1.5 rounded-lg w-full bg-white">
                      <p className="text-center w-full text-sm font-semibold">🇮🇩 Nama Wasit</p>
                      <p className="text-center w-full text-xs text-neutral-600">C3 Referee</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

function LicenseDistribution() {
  return (
    <Card className="px-4 py-3 flex space-x-2">
      <div className="w-1/3">
        <h3 className="font-semibold">License Distribution</h3>
        <MultipleBarChart />
      </div>
      {/* <div className="flex-1">
        <h3 className="font-semibold">License Distribution - Female Referees by Province</h3>
      </div> */}
    </Card>
  );
}

function RefereeList() {
  return (
    <Card className="p-4">
      <h3 className="font-semibold">Referee List</h3>
      <DataTableExample />
    </Card>
  );
}
