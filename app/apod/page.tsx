import { getApod } from "@/lib/nasa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ApodHdToggle } from "@/app/apod/apod-hd-toggle";

export default async function ApodPage({
  searchParams,
}: {
  searchParams: Promise<{ hd?: string }>;
}) {
  const { hd } = await searchParams;
  const isHd = hd === "true";
  const apod = await getApod(isHd);

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-semibold">
        Astronomy Picture of the Day (APOD)
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Each day a different image or photograph of our fascinating universe
        is featured, along with a brief explanation written by a professional
        astronomer.{" "}
        <a
          className="underline"
          href="https://apod.nasa.gov/apod/archivepix.html"
        >
          Discover the cosmos!
        </a>
      </p>
      <Separator className="my-4" />
      <Card>
        {/* eslint-disable-next-line @next/next/no-img-element -- external NASA-hosted image, dynamic per day */}
        <img
          src={isHd ? apod.hdurl ?? apod.url : apod.url}
          alt={apod.title}
          className="w-full object-cover"
        />
        <CardHeader>
          <CardTitle>{apod.title}</CardTitle>
          <CardDescription>{apod.explanation}</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between gap-4 text-sm text-muted-foreground">
          <div>
            <p>Date: {apod.date}</p>
            {apod.copyright && <p>Copyright: {apod.copyright}</p>}
          </div>
          <ApodHdToggle hd={isHd} />
        </CardContent>
      </Card>
    </div>
  );
}
