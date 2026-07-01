import React from 'react';
import EventsClient from './EventsClient';
import { getEvents } from '@/actions/events';

export default async function EventsPage() {
  const result = await getEvents();
  const events = result.events || [];

  return <EventsClient events={events} />;
}
