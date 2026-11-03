import Image from "next/image";

const COLUMNS = [
  { title: "SERVICES", links: ["Airport Transfers", "City to City", "Intercity", "Intercity", "Corporate"] },
  { title: "OUR FLEET", links: ["Sedans", "SUVs", "Luxury Coaches"] },
  { title: "CONTACT", links: ["Bookings", "Support", "Locations"] },
];

export function Footer() {
  return (
    <footer className="mx-auto rounded-[40px] bg-[#1f1f1f] px-6 pt-[48px] text-white md:mx-[1.5%] md:px-[6%]">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[356fr_152fr_146fr_176fr_304fr] lg:gap-0">
        <div>
          <Image
            src="/logo.png"
            alt="United Travel Services"
            width={200}
            height={70}
            className="h-20 w-auto -mt-3"
          />
          <p className="mt-5 max-w-[290px] text-[18px] font-light leading-[34px] tracking-[-0.01em] text-neutral-300">
            Executive chauffeur services across the UK — designed for seamless travel, exceptional
            comfort, and effortless elegance.
          </p>
        </div>

        {COLUMNS.map((col) => (
          <div key={col.title}>
            <h4 className="text-[14px] font-medium leading-none tracking-[0.35em] text-neutral-400">
              {col.title}
            </h4>
            <ul className="mt-[22px] space-y-[11px]">
              {col.links.map((link, i) => (
                <li key={`${link}-${i}`}>
                  <a href="#" className="text-[16px] font-light leading-[23px] text-neutral-300 transition-colors hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="text-[14px] font-medium leading-none tracking-[0.35em] text-neutral-400">
            READY TO BOOK
          </h4>
          <p className="mt-5 text-[18px] font-light leading-[34px] tracking-[-0.01em] text-neutral-300">
            Choose your service and reserve a chauffeur for airport transfers, corporate travel,
            or city-to-city journeys.
          </p>
          <button
            className="mt-4 h-[52px] rounded-md px-6 text-[18px] font-medium tracking-[-0.03em] text-neutral-700"
            style={{ background: "linear-gradient(180deg, #ffffff 0%, #bdbdbd 100%)" }}
          >
            BOOK NOW
          </button>
        </div>
      </div>

      <div className="mt-[36px] border-t border-white/10" />
      <div className="flex flex-col items-start justify-between gap-4 pb-[40px] pt-[32px] text-[16px] font-light text-neutral-300 sm:flex-row">
        <span>© 2026 UTS. All rights reserved.</span>
        <div className="flex gap-[30px]">
          <a href="#" className="hover:text-white">Privacy Policy</a>
          <a href="#" className="hover:text-white">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
