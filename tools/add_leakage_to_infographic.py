#!/usr/bin/env python3
"""Add roof-leakage damage to the 'cheap solar failure' infographic.

Edits the existing render in place (same output path) so the website picks it
up without code changes.
"""

import asyncio
import base64
import os
import sys

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent

load_dotenv("/app/backend/.env")

SRC = "/app/frontend/public/images/infographics/cheap-solar-failure.png"
OUT = "/app/frontend/public/images/infographics/cheap-solar-failure.png"

PROMPT = (
    "Keep this image exactly as it is — same isometric factory, same dark style, "
    "same red fault lines, same panel fire, rusty walkway, falling worker, smoking "
    "battery and '0 kW' meter — but ADD clear signs of ROOF LEAKAGE from poor "
    "workmanship: rainwater dripping and streaming through badly sealed solar "
    "panel mounting penetrations, visible as several thin water streams and drips "
    "falling from the roof edge and under the panel rows; dark wet water stains "
    "streaking down the building's wall cladding beneath the roof line; and a "
    "reflective puddle pooling on the ground at the base of the wall, slightly "
    "splashing onto wooden pallets / stored goods next to the loading bay. Subtle, "
    "realistic, same lighting and palette. Do not remove or alter any existing "
    "element."
)


async def main():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    if not api_key:
        sys.exit("EMERGENT_LLM_KEY missing")

    with open(SRC, "rb") as f:
        ref_b64 = base64.b64encode(f.read()).decode("utf-8")

    chat = LlmChat(api_key=api_key, session_id="gjw-failure-leak-edit",
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
