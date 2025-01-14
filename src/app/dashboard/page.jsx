import { AppSidebar } from '@/components/app-sidebar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { MultipleBarChart } from '../../components/charts/barchart/multiple';
import { PieChartLabel } from '../../components/charts/piechart/piechart-label';
import { AreaStackedChart } from '../../components/charts/area-stackedchart/area-stackedchart';
import { DataTableExample } from '../../components/table/example-table';
import { StackedBarChart } from '../../components/charts/barchart/stacked-barchart';
import { BaseBarchart } from '../../components/charts/barchart/barchart';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible';

export default function Page() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <Collapsible>
          <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
          <CollapsibleContent>Yes. Free to use for personal and commercial projects. No attribution required.</CollapsibleContent>
        </Collapsible>

        {/* Children isi chart dan lain-lain */}
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <div className="grid auto-rows-min gap-4 md:grid-cols-3">
            <div className="rounded-xl bg-muted/50">
              <MultipleBarChart />
            </div>
            <div className="rounded-xl bg-muted/50">
              <PieChartLabel />
            </div>
            <div className="rounded-xl bg-muted/50">
              <AreaStackedChart />
            </div>
            <div className="rounded-xl bg-muted/50">
              <StackedBarChart />
            </div>
            <div className="rounded-xl bg-muted/50">
              <BaseBarchart />
            </div>
          </div>
          {/* <div className="aspect-video rounded-xl bg-muted/50"></div> */}

          <div className="py-2 px-4 rounded-xl border">
            <DataTableExample />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
