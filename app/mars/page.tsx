import { getMarsPhotos } from "@/lib/nasa";
import { ROVERS, type Rover } from "@/lib/types";
import { Separator } from "@/components/ui/separator";
import { MarsRoverSelect } from "@/app/mars/mars-rover-select";
import { MarsPagination } from "@/app/mars/mars-pagination";
import { MarsPhotoDialog } from "@/app/mars/mars-photo-dialog";

function isRover(value: string): value is Rover {
  return (ROVERS as string[]).includes(value);
}

export default async function MarsPage({
  searchParams,
}: {
  searchParams: Promise<{ rover?: string; page?: string }>;
}) {
  const params = await searchParams;
  const rover: Rover =
    params.rover && isRover(params.rover) ? params.rover : "curiosity";
  const page = Number(params.page ?? "1") || 1;
  const photos = await getMarsPhotos(rover, page);

  return (
    <div>
      <h1 className="text-2xl font-semibold">Mars Rover Photos</h1>
      <Separator className="my-4" />
      <p className="text-sm text-muted-foreground">
        This API is designed to collect image data gathered by NASA&apos;s
        Curiosity, Opportunity, and Spirit rovers on Mars and make it more
        easily available to other developers, educators, and citizen
        scientists. Photos are organized by the sol (Martian rotation or day)
        on which they were taken. Results can also be filtered by rover, and
        responses are limited to 25 photos per page.
      </p>
      <div className="my-4 max-w-xs">
        <MarsRoverSelect rover={rover} />
      </div>
      <MarsPhotoDialog photos={photos} />
      {rover === "curiosity" && (
        <div className="mt-6">
          <MarsPagination rover={rover} page={page} />
        </div>
      )}
    </div>
  );
}
