import { useState } from "react";
import axios from "axios";
import { ArrowUpRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { KineticHero } from "@/components/KineticHero";
import { Reveal } from "@/components/Reveal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const CONTACT_INFO = [
  { label: "Email", value: "info@gjwenergy.co.ke", testId: "contact-email-info" },
  { label: "Phone", value: "+254 700 000 000", testId: "contact-phone-info" },
  { label: "Office", value: "Ngong, Kajiado County, Kenya", testId: "contact-office-info" },
  { label: "Mandate", value: "Kenya & the wider East African region", testId: "contact-mandate-info" },
];

const EMPTY = { name: "", email: "", phone: "", company: "", service: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [submitting, setSubmitting] = useState(false);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axios.post(`${API}/contact`, {
        name: form.name,
        email: form.email,
        phone: form.phone || null,
        company: form.company || null,
        service: form.service || null,
        message: form.message,
      });
      toast.success("Message received. Our team will get back to you shortly.");
      setForm(EMPTY);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "h-12 rounded-none border-black/20 bg-white px-4 text-sm focus-visible:ring-ochre";

  return (
    <main data-testid="contact-page">
      <KineticHero
        compact
        kicker="Contact"
        lines={["Start the", { text: "conversation." }]}
        description="Tell us about your project — solar PV, storage, grid or advisory. We'll respond with engineering, not a sales script."
        image="https://images.pexels.com/photos/934586/pexels-photo-934586.jpeg"
      />

      <section className="bg-bone py-24 lg:py-32" data-testid="contact-section">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 lg:grid-cols-2 lg:gap-24 lg:px-10">
          <Reveal>
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Reach us</p>
            <h2 className="mt-6 font-display text-4xl font-extrabold uppercase leading-[0.95] tracking-tighter sm:text-5xl">
              Based in Ngong.
              <br />
              Building for the region.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-black/60 md:text-base">
              Whether it's a utility-scale plant, a C&I installation or an owner's engineer
              mandate — the first step is a conversation with our Project Lead.
            </p>

            <div className="mt-12 border-t border-black/10">
              {CONTACT_INFO.map((c) => (
                <div key={c.label} className="grid grid-cols-3 gap-4 border-b border-black/10 py-5" data-testid={c.testId}>
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-black/45">{c.label}</p>
                  <p className="col-span-2 text-sm font-medium md:text-base">{c.value}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <form
              onSubmit={onSubmit}
              className="border border-black/15 bg-white p-8 lg:p-10"
              data-testid="contact-form"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-ochre">Project enquiry</p>

              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
                    Name *
                  </Label>
                  <Input
                    id="contact-name"
                    data-testid="contact-name-input"
                    required
                    minLength={2}
                    value={form.name}
                    onChange={set("name")}
                    placeholder="Your full name"
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
                    Email *
                  </Label>
                  <Input
                    id="contact-email"
                    type="email"
                    data-testid="contact-email-input"
                    required
                    value={form.email}
                    onChange={set("email")}
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone" className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
                    Phone
                  </Label>
                  <Input
                    id="contact-phone"
                    data-testid="contact-phone-input"
                    value={form.phone}
                    onChange={set("phone")}
                    placeholder="+254 ..."
                    className={fieldClass}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-company" className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
                    Company
                  </Label>
                  <Input
                    id="contact-company"
                    data-testid="contact-company-input"
                    value={form.company}
                    onChange={set("company")}
                    placeholder="Organisation"
                    className={fieldClass}
                  />
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <Label className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">Service of interest</Label>
                <Select value={form.service} onValueChange={(v) => setForm((f) => ({ ...f, service: v }))}>
                  <SelectTrigger data-testid="contact-service-select" className="h-12 rounded-none border-black/20 bg-white px-4 text-sm focus:ring-ochre">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent className="rounded-none bg-white">
                    {["EPC", "Construction", "Design", "Consultancy", "Other"].map((s) => (
                      <SelectItem key={s} value={s} data-testid={`contact-service-option-${s.toLowerCase()}`}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-6 space-y-2">
                <Label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/50">
                  Project details *
                </Label>
                <Textarea
                  id="contact-message"
                  data-testid="contact-message-input"
                  required
                  minLength={10}
                  rows={5}
                  value={form.message}
                  onChange={set("message")}
                  placeholder="Location, capacity, timeline — anything that helps us understand the scope."
                  className="rounded-none border-black/20 bg-white px-4 py-3 text-sm focus-visible:ring-ochre"
                />
              </div>

              <Button
                type="submit"
                disabled={submitting}
                data-testid="contact-submit-button"
                className="group mt-8 h-12 w-full rounded-none bg-obsidian font-mono text-xs font-semibold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:bg-ochre hover:text-obsidian"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending
                  </>
                ) : (
                  <>
                    Send enquiry
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </Button>
            </form>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
