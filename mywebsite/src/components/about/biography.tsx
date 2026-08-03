import Image from "next/image";

import { profile } from "@/data/profile";

/**
 * Opening statement + portrait + first-person narrative (wireframe 1h).
 * PLACEHOLDER narrative — rewrite in your own voice in this file or move
 * the copy to data/profile.ts if you prefer.
 */
export function Biography() {
  return (
    <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)]">
      <div>
        <h1 className="type-page-title max-w-2xl">
          Engineer first. <span className="text-accent">Integrator</span>{" "}
          always.
        </h1>

        <div className="mt-8 flex max-w-prose flex-col gap-5 text-foreground-muted">
          <p>
            I got into embedded systems the way most people leave them: by
            debugging. The first time I traced a misbehaving device to a single
            schematic decision — a pull-up on the wrong rail — I understood that
            hardware and software are one system wearing two disguises, and I
            have worked at that seam ever since.
          </p>
          <p>
            My work sits across firmware, vehicle communication, and connected
            hardware. I like CAN buses because they are honest: every frame is
            on the wire, and the truth is one capture away. I like IoT devices
            because they are unforgiving: no one walks over to reboot a tracker
            in the field, so reliability has to be designed in, not patched on.
          </p>
          <p>
            My approach to problems is unglamorous and effective: reproduce it,
            instrument it, shrink it, fix it, and then write down what happened
            so the next engineer — usually me, six months later — doesn&rsquo;t
            pay for it twice. Debugging, documentation, and testing are not
            chores after the real work. They are the real work.
          </p>
          <p>
            What I care about most is shipping: taking a system from schematic
            review and board bring-up through firmware, testing, and deployment
            — and having it still working, unattended, a year later.
          </p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-xs lg:sticky lg:top-24">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm border border-border">
          <Image
            src={profile.portrait.src}
            alt={profile.portrait.alt}
            fill
            priority
            sizes="320px"
            className="object-cover"
          />
        </div>
        <p className="type-meta mt-3 text-foreground-muted">
          FIG. 01 — {profile.title}
        </p>
        <p className="type-meta mt-1 text-foreground-muted/70">
          {profile.location} · {profile.timezone}
        </p>
      </div>
    </div>
  );
}
