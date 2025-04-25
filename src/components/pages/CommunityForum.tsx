import { HomeHeader } from "../home/HomeHeader";

export default function CommunityForum() {
  return (
    <div className="min-h-screen bg-white">
      <HomeHeader />
      <div className="container pt-24 pb-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-6">Community Forum</h1>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Forum Guidelines</h2>
            <p className="text-gray-700 mb-4">
              Welcome to the Fox Body Finder community! This is a place for
              enthusiasts to discuss all things related to Fox Body Mustangs.
              Please keep discussions respectful and on-topic.
            </p>
            <div className="flex justify-end">
              <button className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
                Create New Topic
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {/* Forum Topics - These would be dynamically generated from a database */}
            {[
              {
                id: 1,
                title: "Best suspension upgrades for a 1989 GT?",
                author: "MustangFan89",
                replies: 24,
                lastActivity: "2 hours ago",
              },
              {
                id: 2,
                title: "Looking for original interior parts for an '87 LX",
                author: "FoxHunter",
                replies: 13,
                lastActivity: "Yesterday",
              },
              {
                id: 3,
                title: "Engine swap options - 5.0 Coyote into Fox Body",
                author: "ModMaster",
                replies: 56,
                lastActivity: "3 days ago",
              },
            ].map((topic) => (
              <div
                key={topic.id}
                className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-medium mb-2">{topic.title}</h3>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Posted by: {topic.author}</span>
                  <span>{topic.replies} replies</span>
                  <span>Last activity: {topic.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button className="text-gray-600 hover:text-black">
              Load more topics...
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
