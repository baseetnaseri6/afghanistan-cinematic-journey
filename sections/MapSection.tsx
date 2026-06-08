"use client";

import { useEffect, useMemo, useState } from "react";
import { geoMercator, geoPath } from "d3-geo";
import ProvinceModal from "@/components/ProvinceModal";

const MAP_DATA_PATH = "/maps/af.json";

type ProvinceDetail = {
  description: string;
  famousFor: string[];
  highlights: string[];
  nature: string;
  image: string;
  region: string;
  capital: string;
  population: string;
  districtCount: string;
  districts: string[];
  mainLanguage: string;
  area: string;
  provinceStory?: string;
};

const provinceStats: Record<string, Omit<ProvinceDetail, "description" | "famousFor" | "highlights" | "nature" | "image" | "districtCount" | "districts">> = {
  Kabul: { capital: "Kabul", population: "5,572,630", region: "Central Afghanistan", mainLanguage: "Dari & Pashto", area: "4,462 km²" },
  Badakhshan: { capital: "Fayzabad", population: "1,107,995", region: "Northeastern Afghanistan", mainLanguage: "Dari", area: "44,059 km²" },
  Badghis: { capital: "Qala-e-Naw", population: "587,868", region: "Northwestern Afghanistan", mainLanguage: "Dari", area: "20,591 km²" },
  Baghlan: { capital: "Pul-e-Khumri", population: "1,074,826", region: "Northern Afghanistan", mainLanguage: "Dari & Pashto", area: "21,118 km²" },
  Balkh: { capital: "Mazar-e-Sharif", population: "1,543,853", region: "Northern Afghanistan", mainLanguage: "Dari", area: "16,840 km²" },
  Bamyan: { capital: "Bamyan", population: "513,190", region: "Central Afghanistan", mainLanguage: "Dari", area: "14,175 km²" },
  Daykundi: { capital: "Nili", population: "532,042", region: "Central Afghanistan", mainLanguage: "Dari", area: "18,088 km²" },
  Farah: { capital: "Farah", population: "626,948", region: "Western Afghanistan", mainLanguage: "Dari & Pashto", area: "48,471 km²" },
  Faryab: { capital: "Maimana", population: "1,129,528", region: "Northern Afghanistan", mainLanguage: "Dari, Uzbeki & Turkmeni", area: "20,293 km²" },
  Ghazni: { capital: "Ghazni", population: "1,386,764", region: "Southeastern Afghanistan", mainLanguage: "Dari & Pashto", area: "22,915 km²" },
  Ghor: { capital: "Firozkoh", population: "822,738", region: "Central Afghanistan", mainLanguage: "Dari", area: "36,479 km²" },
  Helmand: { capital: "Lashkar Gah", population: "1,472,162", region: "Southern Afghanistan", mainLanguage: "Pashto", area: "58,584 km²" },
  Herat: { capital: "Herat", population: "2,300,000", region: "Western Afghanistan", mainLanguage: "Dari", area: "54,778 km²" },
  Jowzjan: { capital: "Sheberghan", population: "613,481", region: "Northern Afghanistan", mainLanguage: "Uzbeki, Dari & Turkmeni", area: "11,798 km²" },
  Kandahar: { capital: "Kandahar", population: "1,570,000", region: "Southern Afghanistan", mainLanguage: "Pashto", area: "54,022 km²" },
  Kapisa: { capital: "Mahmud Raqi", population: "505,852", region: "Central Afghanistan", mainLanguage: "Dari & Pashto", area: "1,842 km²" },
  Khost: { capital: "Khost", population: "670,000", region: "Southeastern Afghanistan", mainLanguage: "Pashto", area: "4,152 km²" },
  Kunar: { capital: "Asadabad", population: "517,180", region: "Eastern Afghanistan", mainLanguage: "Pashto & Dari", area: "4,942 km²" },
  Kunduz: { capital: "Kunduz", population: "1,136,677", region: "Northern Afghanistan", mainLanguage: "Dari, Pashto & Uzbeki", area: "8,040 km²" },
  Laghman: { capital: "Mehtarlam", population: "502,148", region: "Eastern Afghanistan", mainLanguage: "Pashto & Dari", area: "3,843 km²" },
  Logar: { capital: "Pul-e-Alam", population: "464,292", region: "Central Afghanistan", mainLanguage: "Pashto & Dari", area: "3,880 km²" },
  Nangarhar: { capital: "Jalalabad", population: "1,769,990", region: "Eastern Afghanistan", mainLanguage: "Pashto", area: "7,727 km²" },
  Nimroz: { capital: "Zaranj", population: "186,963", region: "Southwestern Afghanistan", mainLanguage: "Dari & Pashto", area: "41,005 km²" },
  Nuristan: { capital: "Parun", population: "175,507", region: "Eastern Afghanistan", mainLanguage: "Nuristani, Pashto & Dari", area: "9,225 km²" },
  Paktia: { capital: "Gardez", population: "830,994", region: "Southeastern Afghanistan", mainLanguage: "Pashto", area: "6,432 km²" },
  Paktika: { capital: "Sharan", population: "809,708", region: "Southeastern Afghanistan", mainLanguage: "Pashto", area: "19,482 km²" },
  Panjshir: { capital: "Bazarak", population: "177,000", region: "Northeastern Afghanistan", mainLanguage: "Dari", area: "3,610 km²" },
  Parwan: { capital: "Charikar", population: "764,515", region: "Central Afghanistan", mainLanguage: "Dari & Pashto", area: "5,974 km²" },
  Samangan: { capital: "Aybak", population: "451,000", region: "Northern Afghanistan", mainLanguage: "Dari & Uzbeki", area: "11,262 km²" },
  "Sar-e Pol": { capital: "Sar-e Pol", population: "700,000", region: "Northern Afghanistan", mainLanguage: "Dari, Uzbeki & Turkmeni", area: "16,360 km²" },
  Takhar: { capital: "Taloqan", population: "1,200,000", region: "Northeastern Afghanistan", mainLanguage: "Dari", area: "12,333 km²" },
  Uruzgan: { capital: "Tarin Kot", population: "450,000", region: "Central Afghanistan", mainLanguage: "Pashto & Dari", area: "12,640 km²" },
  Wardak: { capital: "Maidan Shar", population: "660,258", region: "Central Afghanistan", mainLanguage: "Pashto & Dari", area: "8,938 km²" },
  Zabul: { capital: "Qalat", population: "391,000", region: "Southern Afghanistan", mainLanguage: "Pashto", area: "17,293 km²" },
};

const provinceDistricts: Record<string, string[]> = {
  Kabul: ["Kabul","Bagrami","Char Asiab","Deh Sabz","Farza","Guldara","Istalif","Kalakan","Khak-e-Jabar","Mir Bacha Kot","Musayi","Paghman","Qarabagh","Shakardara","Surobi"],
  Badakhshan: ["Argo","Arghanj Khwa","Baharak","Darayim","Fayzabad","Ishkashim","Jurm","Kishim","Kohistan","Kuran wa Munjan","Raghistan","Shighnan","Shohada","Tagab","Teshkan","Wakhan","Warduj","Yaftal-e-Sufla","Yaftal-e-Ulya","Yamgan","Yawan","Zebak","Kuf Ab","Khwahan","Nusay","Darwaz","Shekay","Ashkasham"],
  Badghis: ["Qala-e-Naw","Ab Kamari","Ghormach","Jawand","Muqur","Murghab","Qadis"],
  Baghlan: ["Baghlan-e-Markazi","Andarab","Burka","Dahana-e-Ghori","Dushi","Khinjan","Nahrin","Pul-e-Khumri","Tala wa Barfak","Khost wa Fereng","Guzargah-e-Noor","Deh Salah","Banu","Farang wa Gharu","Baghlan-e-Jadid"],
  Balkh: ["Mazar-e-Sharif","Balkh","Chahar Bolak","Chahar Kint","Dawlatabad","Dehdadi","Kaldar","Khulm","Kishindeh","Marmul","Nahri Shahi","Sholgara","Shortepa","Zari","Chimtal"],
  Bamyan: ["Bamyan","Kahmard","Panjab","Sayghan","Shibar","Waras","Yakawlang"],
  Daykundi: ["Nili","Ashtarlay","Gizab","Khedir","Kiti","Miramor","Patoo","Sangtakht","Shahristan"],
  Farah: ["Farah","Anar Dara","Bala Buluk","Bakwa","Gulistan","Khak-e-Safed","Lash wa Juwayn","Pusht Rod","Qala-e-Kah","Pur Chaman","Shib Koh"],
  Faryab: ["Maimana","Almar","Andkhoy","Bilchiragh","Dawlatabad","Gurziwan","Khwaja Sabz Posh","Kohistan","Khani Chahar Bagh","Pashtun Kot","Qaramqol","Qaysar","Shirin Tagab","Dawlat Yar","Garziwan"],
  Ghazni: ["Ghazni","Andar","Deh Yak","Gelan","Giro","Jaghatu","Jaghori","Khwaja Omari","Malistan","Muqur","Nawa","Nawur","Qarabagh","Rashidan","Waghaz","Zana Khan","Ajristan","Ab Band","Giro"],
  Ghor: ["Chaghcharan (Firozkoh)","Dawlat Yar","Dolina","Lal wa Sarjangal","Pasaband","Saghar","Shahrak","Taywara","Tulak","Charsada","Du Layna"],
  Helmand: ["Lashkar Gah","Baghran","Dishu","Garmsir","Kajaki","Khanashin","Musa Qala","Nad Ali","Nahr-e-Saraj","Nawzad","Reg-e-Khan Nishin","Sangin","Washer","Marjah"],
  Herat: ["Herat","Adraskan","Chesht-e-Sharif","Farsi","Ghoryan","Guzara","Gulran","Injil","Karukh","Kohsan","Kushk","Kushk-e-Kuhna","Obe","Pashtun Zarghun","Shindand","Zinda Jan","Zendah Jan"],
  Jowzjan: ["Sheberghan","Aqcha","Darzab","Fayzabad","Khanaqa","Khamyab","Mingajik","Qarqin","Khwaja Du Koh","Mardyan","Muradyan"],
  Kandahar: ["Kandahar","Arghandab","Daman","Ghorak","Khakrez","Maruf","Maiwand","Miyan Nashin","Nesh","Panjwai","Registan","Shah Wali Kot","Shorabak","Spin Boldak","Arghistan","Takhtapul","Zhari","Dand"],
  Kapisa: ["Mahmud Raqi","Alasay","Hesa Awal Kohistan","Hesa Duwum Kohistan","Koh Band","Nejrab","Tagab"],
  Khost: ["Khost","Bak","Gurbuz","Jaji Maidan","Mandozai","Musa Khel","Nadir Shah Kot","Qalandar","Sabari","Shamal","Spera","Tani","Terezayi"],
  Kunar: ["Asadabad","Bar Kunar","Chapa Dara","Dangam","Ghaziabad","Khas Kunar","Marawara","Nari","Narang","Noor Gal","Shaigal wa Shiltan","Sarkani","Watapur","Wigal","Chawkay","Shigal"],
  Kunduz: ["Kunduz","Aliabad","Chahar Dara","Dasht-e-Archi","Imam Sahib","Khan Abad","Qalay-e-Zal"],
  Laghman: ["Mehtarlam","Alingar","Alishing","Dawlat Shah","Qarghayi"],
  Logar: ["Pul-e-Alam","Azra","Baraki Barak","Charkh","Kharwar","Khoshi","Mohammad Agha"],
  Nangarhar: ["Jalalabad","Achin","Bati Kot","Behsud","Chaparhar","Dara-e-Noor","Dih Bala","Dur Baba","Goshta","Hisarak","Khogyani","Kot","Kama","Kuz Kunar","Lal Pur","Momand Dara","Nazyan","Pachir wa Agam","Rodat","Sherzad","Shinwar","Surkh Rod"],
  Nimroz: ["Zaranj","Chakhansur","Char Burjak","Kang","Khash Rod","Delaram"],
  Nuristan: ["Parun","Barg-e-Matal","Du Ab","Kamdesh","Mandol","Nurgram","Wama","Waygal"],
  Paktia: ["Gardez","Ahmad Aba","Ahmad Khel","Dand wa Patan","Jaji","Janikhel","Lija Ahmad Khel","Mirzaka","Said Karam","Shawak","Tsamkani","Zurmat","Zadran","Gerda Serai"],
  Paktika: ["Sharan","Barmal","Dila","Gayan","Gomal","Jani Khel","Mata Khan","Naka","Omna","Sar Hawza","Sarobi","Urgun","Waza Khwa","Wor Mamay","Yahya Khel","Yosuf Khel","Ziruk","Gomal","Dand Patan"],
  Panjshir: ["Bazarak","Anaba","Dara","Khenj","Paryan","Rokha","Shutul","Abshar"],
  Parwan: ["Charikar","Bagram","Ghorband","Jabalussaraj","Koh Safi","Salang","Shinwari","Siyagerd","Surkh Parsa","Sheikh Ali"],
  Samangan: ["Aybak","Dara-e-Suf Bala","Dara-e-Suf Payin","Feroz Nakhchir","Hazrat Sultan","Khuram wa Sarbagh","Ruyi Du Ab"],
  "Sar-e Pol": ["Sar-e Pol","Balkhab","Gosfandi","Kohistanat","Sangcharak","Sayyad","Sozma Qala"],
  Takhar: ["Taloqan","Baharak","Bangi","Chah Ab","Chal","Darqad","Dasht-e-Qala","Farkhar","Hazar Sumuch","Ishkamish","Kalafgan","Khwaja Bahauddin","Khwaja Ghar","Namak Ab","Rustaq","Warsaj","Yangi Qala"],
  Uruzgan: ["Tarin Kot","Chora","Deh Rawud","Gizab","Khas Uruzgan","Shahid-e-Hassas"],
  Wardak: ["Maidan Shar","Chak","Daymirdad","Hesa Awal Behsud","Hesa Duwum Behsud","Jalrez","Jaghatu","Nirkh","Saydabad"],
  Zabul: ["Qalat","Arghandab","Atghar","Daychopan","Mizan","Naw Bahar","Shah Joy","Shamulzayi","Shinkay","Tarnak wa Jaldak","Kakar"],
};

function displayName(name: string) {
  const cleaned = String(name || "").trim();

  const aliases: Record<string, string> = {
    Hirat: "Herat",
    Hilmand: "Helmand",
    Paktya: "Paktia",
    Panjshayr: "Panjshir",
    "Sari Pul": "Sar-e Pol",
    Jawzjan: "Jowzjan",
    Nimruz: "Nimroz",
  };

  return aliases[cleaned] || cleaned;
}

function normalizeProvinceName(name: string) {
  return displayName(name).toLowerCase().replace(/\s+/g, "-").replace(/-e-/g, "-e-");
}

function provinceImage(name: string) {
  const fixedImages: Record<string, string> = {
    "Sar-e Pol": "/images/sar-e-pol.jpg",
    Paktia: "/images/paktia.jpg",
    Helmand: "/images/helmand.jpg",
    Herat: "/images/herat.jpg",
    Panjshir: "/images/panjshir.jpg",
    Jowzjan: "/images/jowzjan.jpg",
    Nimroz: "/images/nimroz.jpg",
  };

  return fixedImages[displayName(name)] || `/images/${normalizeProvinceName(name)}.jpg`;
}

function buildDetail(name: string): ProvinceDetail {
  const canonical = displayName(name);
  const stats = provinceStats[canonical] || {
    capital: canonical,
    population: "Not available",
    region: "Afghanistan",
    mainLanguage: "Not available",
    area: "Not available",
  };

  const districts = provinceDistricts[canonical] || [];

  return {
    description: `${canonical} is renowned for its culture, history, natural beauty, traditions, and the warm hospitality of its people.`,
    famousFor: ["Culture", "History", "Natural Beauty", "Hospitality"],
    highlights: ["Historic places", "Local traditions", "Beautiful landscapes"],
    nature: `${canonical} has a unique landscape and its own local beauty.`,
    image: provinceImage(canonical),
    region: stats.region,
    capital: stats.capital,
    population: stats.population,
    mainLanguage: stats.mainLanguage,
    area: stats.area,
    districts,
    districtCount: `${districts.length} Districts`,
  };
}


export default function MapSection() {
  const [features, setFeatures] = useState<any[]>([]);
  const [selected, setSelected] = useState("Kabul");
  const [hovered, setHovered] = useState<string | null>(null);
  const [modalProvince, setModalProvince] = useState<string | null>(null);

  useEffect(() => {
    fetch(MAP_DATA_PATH)
      .then((res) => res.json())
      .then((data) => {
        const geoFeatures = data?.features || [];
        setFeatures(geoFeatures);
      })
      .catch((error) => {
        console.error("Failed to load Afghanistan GeoJSON map:", error);
      });
  }, []);

  const mapPath = useMemo(() => {
    if (!features.length) return null;

    const collection = {
      type: "FeatureCollection",
      features,
    };

    const projection = geoMercator();
    projection.fitSize([780, 540], collection as any);

    return geoPath(projection);
  }, [features]);

  const selectedDetail = useMemo(() => buildDetail(selected), [selected]);
  const modalDetail = useMemo(
    () => (modalProvince ? buildDetail(modalProvince) : undefined),
    [modalProvince]
  );

  function getProvinceName(feature: any) {
    const props = feature?.properties || {};

    const raw =
      props.name ||
      props.Name ||
      props.NAME ||
      props.NAME_1 ||
      props.province ||
      props.Province ||
      props.PROVINCE ||
      props.admin1Name ||
      props.shapeName ||
      props.ADM1_EN ||
      props.ADM1_NAME ||
      "";

    return displayName(String(raw).trim());
  }

  const activeName = displayName(hovered || selected);

  return (
    <section
      id="map"
      className="relative overflow-hidden bg-black px-6 py-32 text-white md:px-20"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.10),_black_72%)]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-4xl text-center">
          <p className="mb-5 text-sm uppercase tracking-[0.55em] text-cyan-200/55">
            Interactive Afghanistan
          </p>

          <h2 className="text-5xl font-black uppercase md:text-7xl">
            34 Provinces
          </h2>

          <p className="mt-5 text-lg text-white/55">
            Click a province to open its full experience.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-center">
          <div className="premium-card relative overflow-hidden rounded-[2rem] p-6">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(34,211,238,0.10),_transparent_60%)]" />

            <svg
              viewBox="0 0 780 540"
              className="relative z-10 h-auto w-full"
              role="img"
              aria-label="Afghanistan provinces map"
            >
              {features.map((feature, index) => {
                const name = getProvinceName(feature);
                const d = mapPath ? mapPath(feature as any) : "";

                return (
                  <path
                    key={`${name}-${index}`}
                    d={d || ""}
                    onMouseEnter={() => setHovered(name)}
                    onMouseLeave={() => setHovered(null)}
                    onPointerDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const province = displayName(name);
                      setSelected(province);
                      setModalProvince(province);
                    }}
                    className={`cursor-pointer stroke-white/85 transition-all duration-300 ${
                      activeName === name
                        ? "fill-cyan-400 drop-shadow-[0_0_16px_rgba(34,211,238,0.9)]"
                        : "fill-zinc-400 hover:fill-cyan-300"
                    }`}
                    strokeWidth={0.8}
                  />
                );
              })}
            </svg>
          </div>

          <div className="premium-card rounded-[2rem] p-8">
            <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/60">
              {hovered ? "Hovering Province" : "Selected Province"}
            </p>

            <h3 className="mt-4 text-4xl font-black text-cyan-100 md:text-5xl">
              {displayName(activeName)}
            </h3>

            <p className="mt-6 leading-8 text-white/65">
              {buildDetail(activeName).description}
            </p>

            <button
              onPointerDown={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setModalProvince(displayName(activeName));
              }}
              className="mt-8 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-7 py-3 font-bold text-cyan-100 transition hover:bg-cyan-300 hover:text-black"
            >
              Open Province Experience
            </button>
          </div>
        </div>
      </div>

      {modalProvince && modalDetail && (
        <ProvinceModal
          name={displayName(modalProvince)}
          detail={modalDetail}
          onClose={() => setModalProvince(null)}
        />
      )}
    </section>
  );
}
