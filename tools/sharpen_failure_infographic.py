#!/usr/bin/env python3
"""Sharpen the cheap-solar failure infographic for lightbox zoom.

Pass 1: ask the model to re-render the same scene at higher fidelity.
Pass 2 (always): 2x Lanczos upscale + unsharp mask so the 2.2x zoom stays crisp.
Writes back to the same path the site already serves.
"""

import asyncio
import base64
import os
import shutil

from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage, ImageContent
from PIL import Image, ImageFilter, ImageEnhance

load_dotenv("/app/backend/.env")

PATH = "/app/frontend/public/images/infographics/cheap-solar-failure.png"
BAK = "/app/frontend/public/images/infographics/cheap-solar-failure.orig.png"

PROMPT = (
    "Re-render this exact image — identical scene, composition, colours and every "
    "detail (factory with rooftop solar, panel fire, rusty walkway, falling worker, "
    "smoking battery, water leaks, red fault lines, '0 kW' meter) — but at the "
    "highest resolution and sharpness you can produce: crisp clean edges, fine "
    "detail in the panels, cables and textures, no blur, no painterly softness. "
    "Do not add, remove or move anything."
)


async def regen():
    api_key = os.getenv("EMERGENT_LLM_KEY")
    with open(PATH, "rb") as f:
        ref = base64.b64encode(f.read()).decode("utf-8")
    chat = LlmChat(api_key=api_key, session_id="gjw-failure-sharpen",
                   system_message="You are a precise technical illustrator.")
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(
        modalities=["image", "text"])
    _, images = await chat.send_message_multimodal_response(
        UserMessage(text=PROMPT, file_contents=[ImageContent(ref)]))
    if images:
        with open(BAK, "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        im = Image.open(BAK)
        print("regen size:", im.size)
        if im.size[0] >= 1408:  # accept only if not smaller
            shutil.copy(BAK, PATH)
            return
        print("regen smaller — keeping original, upscale only")


asyncio.run(regen())

im = Image.open(PATH).convert("RGB")
w, h = im.size
up = im.resize((w * 2, h * 2), Image.LANCZOS)
up = ImageEnhance.Contrast(up).enhance(1.04)
up = up.filter(ImageFilter.UnsharpMask(radius=2, percent=85, threshold=2))
up.save(PATH, optimize=True)
print("final:", up.size, os.path.getsize(PATH), "bytes")
