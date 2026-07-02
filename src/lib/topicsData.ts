import { USE_CASES } from "@/lib/data";
import { AI_NEWS } from "@/lib/newsDataCombined";
import { AI_TOOLS } from "@/lib/toolsData";
import { CONCEPTS } from "@/lib/concepts";
import { tagsMatch, type TopicDef } from "./topicHubs";

export * from "./topicHubs";

export function getTopicContent(topic: TopicDef) {
  const prompts = USE_CASES.filter(u => tagsMatch(u.tags, topic.matchTags));
  const news = AI_NEWS
    .filter(n => tagsMatch(n.tags, topic.matchTags))
    .sort((a, b) => b.dateNum - a.dateNum || (b.dateDay ?? 0) - (a.dateDay ?? 0));
  const tools = AI_TOOLS.filter(t => tagsMatch(t.tags, topic.matchTags));
  const concepts = CONCEPTS.filter(c =>
    tagsMatch([c.term, c.tagline, c.category], topic.matchTags) ||
    c.body.toLowerCase().split(" ").slice(0, 40).join(" ").includes(topic.matchTags[0])
  );
  return { prompts, news, tools, concepts };
}
