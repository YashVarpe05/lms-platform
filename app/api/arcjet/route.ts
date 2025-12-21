import { NextRequest, NextResponse } from "next/server";
import arcjet from "@/lib/arcjet";

export async function GET(req: NextRequest) {
	try {
		const decision = await arcjet.protect(req, {
			fingerprint: req.headers.get("x-forwarded-for") || "anonymous",
		});

		return NextResponse.json({
			success: true,
			protected: true,
			decision: {
				id: decision.id,
				conclusion: decision.conclusion,
				reason: decision.reason,
				ip: decision.ip,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Arcjet protection error:", error);
		
		return NextResponse.json(
			{
				success: false,
				error: "Failed to apply protection",
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		);
	}
}

export async function POST(req: NextRequest) {
	try {
		const decision = await arcjet.protect(req, {
			fingerprint: req.headers.get("x-forwarded-for") || "anonymous",
		});

		if (decision.isDenied()) {
			return NextResponse.json(
				{
					success: false,
					denied: true,
					reason: decision.reason,
					decision: {
						id: decision.id,
						conclusion: decision.conclusion,
						reason: decision.reason,
					},
					timestamp: new Date().toISOString(),
				},
				{ status: 403 }
			);
		}

		const body = await req.json().catch(() => ({}));

		return NextResponse.json({
			success: true,
			protected: true,
			message: "Request allowed through Arcjet protection",
			data: body,
			decision: {
				id: decision.id,
				conclusion: decision.conclusion,
				reason: decision.reason,
				ip: decision.ip,
			},
			timestamp: new Date().toISOString(),
		});
	} catch (error) {
		console.error("Arcjet protection error:", error);
		
		return NextResponse.json(
			{
				success: false,
				error: "Failed to apply protection",
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		);
	}
}