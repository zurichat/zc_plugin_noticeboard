import { render } from "@testing-library/react";
import PinnedNotices from "./AdminNotice";

describe("Root component", () => {
  it("should be in the document", () => {
    const { getByText } = render(<PinnedNotices name="Testapp" />);
    expect(getByText(/Testapp is mounted!/i)).toBeInTheDocument();
  });
});
