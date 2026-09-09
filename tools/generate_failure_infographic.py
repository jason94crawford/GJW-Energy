#!/usr/bin/env python3
"""Generate the 'cheap solar failure' infographic for the ValueBand section.

Uses the existing manufacturing sector infographic as a style reference so the
new image matches the site's 3D isometric, obsidian/ochre visual language.
Output: /app/frontend/public/images/infographics/cheap-solar-failure.png
"""

import asyncio
import base64
import os
import sys

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv("/app/backend/.env")

REF = "/app/frontend/public/images/infographics/manufacturing.png"
OUT = "/app/frontend/public/images/infographics/cheap-solar-failure.png"

PROMPT = (
    "Using the reference image strictly for style — a dark 3D isometric technical "
    "render of an industrial manufacturing facility with rooftop solar PV, on a "
    "near-black obsidian background, muted industrial greys with glowing accent "
    "lines, soft studio lighting — create a NEW scene: the SAME kind of factory, "
    "but showing a badly built, non-functional 'cheap' solar installation. "
    "Failure details to include: "
    "1) all accent power lines glow RED (fault / system off) instead of orange-yellow; "
    "2) a small production meter kiosk with a digital display clearly reading '0 kW'; "
    "3) the roof edge has NO guardrails and a single worker figure is slipping / "
    "falling off the roof edge; "
    "4) one rooftop access walkway is visibly corroded, rusty orange-brown steel "
    "(cheap steel instead of aluminium); "
    "5) the battery storage container is charred and venting dark grey smoke; "
    "6) one solar PV panel on the roof is on fire with small flames and a thin "
    "smoke plume. "
    "Keep the composition clean and technical like the reference — isometric "
    "engineering illustration, high detail, no labels or text anywhere except the "
    "'0 kW' meter display."
)


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        sys.exit("EMERGENT_LLM_KEY missing")

    with open(REF, "rb") as f:
        ref_b64 = base64.b64encode(f.read()).decode("utf-8")

    chat = LlmChat(api_key=api_key, session_id="gjw-failure-infographic",
                   system_message="You are a precise technical illustrator.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"])

    msg = UserMessage(text=PROMPT, file_contents=[ImageContent(ref_b64)])
    text, images = await chat.send_message_multimodal_response(msg)
    print("text:", (text or "")[:200])
    if not images:
        sys.exit("no image returned")
    data = base64.b64decode(images[0]["data"])
    with open(OUT, "wb") as f:
        f.write(data)
    print("saved", OUT, len(data), "bytes")


asyncio.run(main())
