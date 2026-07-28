"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import type { Character, Scene } from "@/types/types";
import { getCharacters } from "@/services/characters.service";
import { getScenes } from "@/services/scenes.service";
import { createSession } from "@/services/session.service";
import { listConversations } from "@/services/conversations.service";
import {
  Button
} from "@/components/ui";
import {
  LoadingState,
  ErrorState,
  PageHeader,
} from "@/components/common";
import { ExploreCharacters } from "./components";

export default function CharactersPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <CharactersPageContent />
    </Suspense>
  );
}

function CharactersPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sceneFilter = searchParams.get("scene");

  const [characters, setCharacters] = useState<Character[]>([]);
  const [scenes, setScenes] = useState<Scene[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null,
  );
  const [creatingSession, setCreatingSession] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [charactersData, scenesData] = await Promise.all([
          getCharacters(sceneFilter || undefined),
          getScenes(),
        ]);
        setCharacters(charactersData);
        setScenes(scenesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [sceneFilter]);

  const filteredCharacters = characters;

  const handleStartChat = async (character: Character) => {
    try {
      setCreatingSession(true);

      const sceneId = sceneFilter || undefined;
      const { conversations } = await listConversations({
        character_id: character.id,
        scene_id: sceneId,
        limit: 1,
      });
      const recentConversationId = conversations.length > 0 ? conversations[0].id : undefined;

      const session = await createSession(character.id, sceneId, recentConversationId);
      router.push(`/chat?session=${session.session_id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create session");
    } finally {
      setCreatingSession(false);
    }
  };

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} />;
  }

  const filterScene = sceneFilter
    ? scenes.find((s) => s.id === sceneFilter)
    : null;

  return (
    <div className="container md:w-8/9 mx-auto px-4 py-4 sm:py-8">
      {/* Header */}
      <PageHeader
        title="Meet the Characters"
        description={
          filterScene
            ? `Characters in ${filterScene.name}`
            : "Discover unique personalities and their stories"
        }
        onBack={() => router.push("/")}
        actions={
          sceneFilter && (
            <Button
              variant="secondary"
              onClick={() => router.push("/characters")}
            >
              Show All
            </Button>
          )
        }
      />

      {/* Characters Grid */}
      <ExploreCharacters
        characters={filteredCharacters}
        scenes={scenes}
        creatingSession={creatingSession}
        selectedCharacterId={selectedCharacter?.id || null}
        onStartChat={handleStartChat}
        onSelect={(char: Character) =>
          setSelectedCharacter(
            selectedCharacter?.id === char.id ? null : char,
          )
        }
        hideHeader
      />
    </div>
  );
}
