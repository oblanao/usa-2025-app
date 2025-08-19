import { getEventById, getReferencedItem } from '@/app/lib/data';
import Header from '@/app/components/Header';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import ReferencedItemDetails from '@/app/components/ReferencedItemDetails';

type EventPageProps = {
  params: {
    id: string;
  };
};

export default async function EventPage({ params }: EventPageProps) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  const referencedItem = await getReferencedItem(
    event.referenced_item_type,
    event.referenced_item_id,
  );

  return (
    <>
      <Header title={event.title} showBackButton />
      <div className="p-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {referencedItem && 'featured_image' in referencedItem && (
            <div className="relative h-56 w-full">
              <Image
                src={referencedItem.featured_image}
                alt={event.title}
                layout="fill"
                objectFit="cover"
                className="opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </div>
          )}
          <div className="p-6">
            <h2 className="text-3xl font-extrabold text-text -mt-16 relative z-10 text-white drop-shadow-lg">
              {event.title}
            </h2>
            <p className="text-gray-700 mt-4 text-lg">{event.description}</p>
            {referencedItem && (
              <ReferencedItemDetails
                item={referencedItem}
                type={event.referenced_item_type}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
