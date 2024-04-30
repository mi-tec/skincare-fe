import useEmblaCarousel from "embla-carousel-react";
import { headerSliders, mainServices } from "../../lib/content.js";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";

function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 3000 }),
  ]);

  return (
    <div className="home-body general-block ">
      <div className="header-slider">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {headerSliders.map((item, i) => (
              <div className="embla__slide" key={i}>
                <img src={item} className="embla__slide--image" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="welcome bg-slate-700 text-slate-50 text-center p-5">
        <div className="welcome__title text-[36px]">
          <p>Skin Specialists in Sri Lanka</p>
        </div>
        <div className="welcome__desc p-10">
          <p>
            Thank you for choosing Skin Clinic, your trusted therapeutic &
            cosmetic Dermatology clinic in Sri Lanka. We provide services to
            patients of all ages with a variety of Skin problems, including
            problems that affect hair & nails. Our medical services embrace your
            natural beauty. We are committed to providing you with state of the
            art treatments and the highest safety protocols in place in this
            country. Our goal is to provide you with personalized treatments and
            services over the years, focusing on your goals and desired outcome.
            Our providers bring you over 60 years of combined experience since
            1956. We offer you the most advanced therapeutic & cosmetic
            Dermatology treatments and the latest of technologies.We hope your
            experience at Skin Clinic exceeds your expectations.
          </p>
        </div>
      </div>
      <div className="main-services mt-5 grid grid-cols-3 gap-4">
        {mainServices.map((item, i) => {
          return (
            <div
              className="rounded-lg border bg-card text-card-foreground shadow-sm"
              key={i}
            >
              <div
                className="bg-cover bg-center bg-no-repeat min-h-[250px]"
                style={{ backgroundImage: `url(${item.image})` }}
              ></div>
              <div className="flex flex-col space-y-1.5 p-6">
                <div className="text-2xl font-semibold leading-none tracking-tight">
                  {item.title}
                </div>
              </div>
              <div className="p-6 pt-0">
                <p>
                  {item.desc.length <= 100
                    ? item.desc
                    : item.desc.slice(0, 100) + "..."}
                </p>
              </div>
              <div className="flex items-center p-6 pt-0">
                <div className="h-10 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to={`/services/${item.slug}`}>View More</Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
