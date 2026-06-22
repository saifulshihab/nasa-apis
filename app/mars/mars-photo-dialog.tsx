"use client";

import { useState } from "react";
import type { MarsPhoto } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

export function MarsPhotoDialog({ photos }: { photos: MarsPhoto[] }) {
  const [selected, setSelected] = useState<MarsPhoto | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {photos.map((photo) => (
          <Card
            key={photo.id}
            className="cursor-pointer overflow-hidden opacity-70 transition-opacity hover:opacity-100"
            onClick={() => setSelected(photo)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- external NASA-hosted image, dynamic per rover/sol */}
            <img
              src={photo.img_src}
              alt={`Sol ${photo.sol}`}
              className="aspect-square w-full object-cover"
            />
          </Card>
        ))}
      </div>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
          {selected && (
            <>
              <DialogHeader>
                <DialogTitle>Photo Information</DialogTitle>
              </DialogHeader>
              {/* eslint-disable-next-line @next/next/no-img-element -- external NASA-hosted image */}
              <img
                src={selected.img_src}
                alt={selected.rover.name}
                className="w-full rounded-lg"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Earth Date: {selected.earth_date}</span>
                <span>Sol: {selected.sol}</span>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium">Rover Info</h3>
                <p className="text-sm">Name: {selected.rover.name}</p>
                <p className="text-sm">
                  Launching Date: {selected.rover.launch_date}
                </p>
                <p className="text-sm">
                  Landing Date: {selected.rover.landing_date}
                </p>
                <p className="text-sm">Status: {selected.rover.status}</p>
              </div>
              <Separator />
              <div>
                <h3 className="font-medium">Camera Info</h3>
                <p className="text-sm">Name: {selected.camera.name}</p>
                <p className="text-sm">
                  Full Name: {selected.camera.full_name}
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
