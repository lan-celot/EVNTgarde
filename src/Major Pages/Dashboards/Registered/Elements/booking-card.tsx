import { Card, Flex, Text, Heading, Badge } from "@radix-ui/themes";
import Image from "next/image";

interface BookingCardProps {
  id: number;
  eventName: string;
  organizer: string;
  date: string;
  status?: string;
  package?: string;
  image: string;
  children?: React.ReactNode;
}

export function BookingCard({
  eventName,
  organizer,
  date,
  status,
  package: pkg,
  image,
  children,
}: BookingCardProps) {
  return (
    <Card>
      <Flex direction="column" gap="3">
        {/* Event Image */}
        <div className="relative h-40 w-full">
          <Image
            src={image}
            alt={eventName}
            fill
            className="rounded-lg object-cover"
          />
        </div>

        {/* Event Details */}
        <Heading size="4">{eventName}</Heading>
        <Text color="gray" size="2">
          Organized by: {organizer}
        </Text>
        <Text color="gray" size="2">
          Date: {new Date(date).toLocaleDateString()}
        </Text>

        {/* Package Details */}
        {pkg && (
          <Text color="gray" size="2">
            Package: {pkg}
          </Text>
        )}

        {/* Status Badge (if provided) */}
        {status && (
          <Badge
            color={status === "accepted" ? "green" : "blue"}
            variant="soft"
            className="mt-2"
          >
            {status}
          </Badge>
        )}

        {/* Children (for additional content) */}
        {children}
      </Flex>
    </Card>
  );
}