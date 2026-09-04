import asyncio
import base64
import os
from dotenv import load_dotenv
from emergentintegrations.llm.chat import LlmChat, UserMessage

load_dotenv("/app/backend/.env")

OUT = "/app/frontend/public/images/infographics"
os.makedirs(OUT, exist_ok=True)

STYLE = (
    "Isometric 3D architectural visualization render, clean minimal low-poly clay style, "
    "matte light-grey and charcoal materials, deep navy-blue solar panels with subtle grid texture, "
    "warm orange (#D97725) accent details and soft glow, dark charcoal near-black background (#0A0A0C), "
    "soft studio lighting, gentle contact shadows, subtle rim light, professional arch-viz quality, "
    "high detail, wide landscape composition, no text, no labels, no watermark, no people close-up."
)

SCENES = {
    "manufacturing": (
        "A modern industrial factory warehouse with a large flat roof covered in neat rows of dark navy solar panels, "
        "with visible maintenance walkways between panel rows, thin guardrails along the roof edges, a roof access ladder "
        "on the side wall, orange safety line markings on the ground near a loading dock with two white box trucks, and a "
        "row of two battery energy storage containers beside the building with a faint orange status glow. " + STYLE
    ),
    "retail": (
        "A contemporary shopping mall building with a flat roof covered in dark navy solar panels, and in front a parking "
        "lot with elegant solar panel carport canopies shading rows of parked cars, small EV charging posts beside some "
        "cars, and a battery storage container near the building corner with a faint orange status glow. " + STYLE
    ),
    "healthcare": (
        "A modern hospital building with a rooftop helipad marked with a circle and H, rows of dark navy solar panels on "
        "the remaining flat roof area, a rooftop access ladder, guardrails along the roof edge, and a battery energy "
        "storage building beside it with a faint orange status glow, a subtle orange medical cross sign on the facade. " + STYLE
    ),
    "hospitality": (
        "A luxury eco safari lodge resort in Africa with several villas with pitched roofs, warm glowing windows, palm "
        "trees and natural landscaping, a ground-mount dark navy solar panel array on a clearing behind the lodge, and "
        "two battery energy storage containers painted to blend with the landscape with a faint orange status glow. " + STYLE
    ),
    "agri": (
        "A flower farm with long curved greenhouse tunnels in rows, a large ground-mount dark navy solar panel array "
        "mounted on slim metal rammed pole foundations without concrete, a packhouse cold-store building, and a battery "
        "energy storage container with a faint orange status glow, green field rows in the foreground. " + STYLE
    ),
}


async def gen(name, prompt):
    chat = LlmChat(
        api_key=os.getenv("EMERGENT_LLM_KEY"),
        session_id=f"gjw-infographic-{name}",
        system_message="You are a helpful AI assistant",
    )
    chat.with_model("gemini", "gemini-3.1-flash-image-preview").with_params(modalities=["image", "text"])
    text, images = await chat.send_message_multimodal_response(UserMessage(text=prompt))
    if images:
        path = os.path.join(OUT, f"{name}.png")
        with open(path, "wb") as f:
            f.write(base64.b64decode(images[0]["data"]))
        print(f"OK {name}: {os.path.getsize(path)} bytes", flush=True)
    else:
        print(f"NO IMAGE for {name}: {text[:120]}", flush=True)


async def main():
    for name, prompt in SCENES.items():
        try:
            await gen(name, prompt)
        except Exception as e:
            print(f"ERROR {name}: {e}", flush=True)


asyncio.run(main())
print("ALL DONE", flush=True)
