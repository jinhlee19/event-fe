import EventItem from "@/components/EventItem";
import Layout from "@/components/Layout";
import { API_URL } from "@/config/index";

export default function ShowcasePage({ events }) {
  return (
    <Layout>
      <section className="flex h-70v justify-center items-center pb-12 flex-col space-y-4">
        <p className="subtitle">the best four ever</p>
        <h1>네 사람이 마주하는 공간</h1>
        <p></p>
      </section>
      <section className="card-container px-16 w-full h-100v grid lg:grid-cols-4">
        {events.length === 0 && <div>No event To Show</div>}
        {events.length != 0 &&
          events.map((evt) => <EventItem key={evt.id} event={evt} />)}
      </section>
      <div className="mx-auto flex justify-center">
        <button className="btn btn--blue">Show More</button>
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  const res = await fetch(`${API_URL}/api/events?populate=*`);
  const json = await res.json();
  const events = json.data;
  return {
    props: { events },
  };
}
